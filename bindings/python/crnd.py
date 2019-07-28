
import ctypes
import sys
import os


me = os.path.abspath(os.path.dirname(__file__))
sys.path.append(os.path.join(me, 'messages'))

from messages import status_pb2, help_pb2, sample_request_pb2, sample_pb2, model_pb2


class ProtoSerialized(ctypes.Structure):
    _fields_ = [('data', ctypes.c_void_p),
                ('size', ctypes.c_int),]


def parse_proto(contents, message):
    msg = (ctypes.c_char *contents.size).from_address(contents.data)
    message.ParseFromString(msg)
    return message


def get_callback(data, status):
    @ctypes.CFUNCTYPE(None, ctypes.c_void_p, ctypes.POINTER(ProtoSerialized), ctypes.POINTER(ProtoSerialized))
    def callback(_, data_in, status_in):
        status = status_pb2.Status()
        status.ParseFromString(status_in.contents.data)
        if status.ok:
            help = help_pb2.Help()
            help.ParseFromString(data_in.contents.data)
        else:
            print("ERROR")

    return callback


class CRND:
    def __init__(self, path_to_library):
        self.dll = ctypes.cdll.LoadLibrary(path_to_library)

    def _call(self, f, data, *input_args):
        status = status_pb2.Status()

        @ctypes.CFUNCTYPE(None, ctypes.c_void_p, ctypes.POINTER(ProtoSerialized), ctypes.POINTER(ProtoSerialized))
        def callback(_, data_in, status_in):
            parse_proto(status_in.contents, status)
            if status.ok:
                parse_proto(data_in.contents, data)

        args = list(input_args) + [callback, ]
        f(None, *args)

        if status.ok:
            return data, status
        else:
            return None, status

    def _sample(self, seed, samples, model):
        sample_request = sample_request_pb2.SampleRequest()
        sample_request.seed = seed
        sample_request.n_samples = samples
        sample_request.model.CopyFrom(model)

        message_str = sample_request.SerializeToString()
        prt = ProtoSerialized()
        prt.size = len(message_str)
        prt.data = ctypes.cast( message_str, ctypes.c_void_p )

        sample = sample_pb2.Sample()
        sample, status = self._call(self.dll.sample, sample, ctypes.byref(prt))
        print(sample)
        return

    def help(self, output):
        help = help_pb2.Help()
        help, status = self._call(self.dll.help, help)
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