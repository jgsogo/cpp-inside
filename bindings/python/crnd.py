
import ctypes
import sys
import os


me = os.path.abspath(os.path.dirname(__file__))
sys.path.append(os.path.join(me, 'messages'))

from messages import status_pb2, help_pb2, sample_request_pb2, sample_pb2, model_pb2


class ProtoSerialized(ctypes.Structure):
    _fields_ = [('data', ctypes.c_void_p),
                ('size', ctypes.c_int),]

    def parse_as(self, proto_class):
        msg = (ctypes.c_char *self.size).from_address(self.data)
        proto = proto_class()
        proto.ParseFromString(msg)
        return proto

    @classmethod
    def build_from(cls, proto):
        instance = cls()
        instance._as_str = proto.SerializeToString()  # Need to keep this in memory
        instance.size = len(instance._as_str)
        instance.data = ctypes.cast(instance._as_str, ctypes.c_void_p)
        return instance

    def as_ref(self):
        return ctypes.byref(self)



class CRND:
    def __init__(self, path_to_library):
        self.dll = ctypes.cdll.LoadLibrary(path_to_library)

    @staticmethod
    def _call(f, data_proto_class, *input_args):
        @ctypes.CFUNCTYPE(None, ctypes.c_void_p, ctypes.POINTER(ProtoSerialized), ctypes.POINTER(ProtoSerialized))
        def callback(_, data_in, status_in):
            callback.status = status_in.contents.parse_as(status_pb2.Status)
            if callback.status.ok:
                callback.data = data_in.contents.parse_as(data_proto_class)

        args = list(input_args) + [callback, ]
        f(None, *args)

        if callback.status.ok:
            return callback.data, callback.status
        else:
            return None, callback.status

    def _sample(self, seed, samples, model):
        sample_request = sample_request_pb2.SampleRequest()
        sample_request.seed = seed
        sample_request.n_samples = samples
        sample_request.model.CopyFrom(model)

        sample_request_p = ProtoSerialized.build_from(sample_request)
        sample, status = self._call(self.dll.sample, sample_pb2.Sample, sample_request_p.as_ref())
        print(sample)
        return

    def help(self, output):
        help, status = self._call(self.dll.help, help_pb2.Help)
        print(help)

    def uniform(self, seed, samples):
        pass

    def normal(self, seed, samples, mean, stddev):
        pass

    def lognormal(self, seed, samples, mean, stddev):
        model = model_pb2.Model()
        model.id = model_pb2.Model.LOGNORMAL
        model.params["mean"] = mean
        model.params["stddev"] = stddev
        return self._sample(seed, samples, model)


if __name__ == '__main__':
    path_to_lib = r'/Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/lib/libcrnd.dylib'

    crnd = CRND(path_to_lib)
    print(crnd.dll)
    crnd.help(None)

    crnd.lognormal(seed=1234, samples=10, mean=2, stddev=0.2)