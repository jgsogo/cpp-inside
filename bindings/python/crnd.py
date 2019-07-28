
import ctypes


class ProtoSerialized(ctypes.Structure):

    _fields_ = [('data', ctypes.c_void_p),
                ('size', ctypes.POINTER(ctypes.c_int)),]


class CRND:
    def __init__(self, path_to_library):
        # self.path_to_library = path_to_library
        self.dll = ctypes.cdll.LoadLibrary(path_to_library)

    def help(self, output):
        @ctypes.CFUNCTYPE(None, ctypes.c_void_p, ctypes.c_void_p)
        def callback(data, status):

            print("foo has finished its job")

        self.dll.help(None, callback)

    def uniform(self, seed, samples):
        pass

    def normal(self, seed, samples, mean, stddev):
        pass

    def lognormal(self, seed, samples, mean, stddev):
        pass


if __name__ == '__main__':
    path_to_lib = r'/Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/lib/libcrnd.dylib'

    crnd = CRND(path_to_lib)
    print(crnd.dll)
    crnd.help(None)