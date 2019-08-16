import shutil
import os
from conans import ConanFile, tools, CMake


class CppInside(ConanFile):
    name = "cpp-inside"
    version = "1.0"

    settings = "os", "arch", "compiler", "build_type"
    generators = "cmake"
    options = {#"cpp": [True, False],  # It is always generated
               "csharp": [True, False],
               "java": [True, False],
               "js": [True, False],
               "objc": [True, False],
               "php": [True, False],
               "python": [True, False],
                "ruby": [True, False],
                "go": [True, False],
               }
    default_options = {#"cpp": True,
                       "csharp": True,
                       "java": True,
                       "js": True,
                       "objc": True,
                       "php": True,
                       "python": True,
                       "ruby": True,
                       "go": True,
                       }

    exports_sources = "library/*"

    def build_requirements(self):
        self.build_requires("protoc_installer/3.6.1@bincrafters/stable")

    def requirements(self):
        self.requires("protobuf/3.6.1@bincrafters/stable")
        self.requires("boost/1.70.0@conan/stable")
        self.requires("spdlog/1.3.1@bincrafters/stable")

    def source(self):
        env = {}
        if self.options.go:
            self.run("go get github.com/golang/protobuf/protoc-gen-go")
            self.run("go get github.com/golang/protobuf/proto")
            #with tools.chdir(os.path.join(self.source_folder, "messages")):
            #    self.run("protoc --go_out={} *.proto".format(os.path.join(self.source_folder, "bindings", "go", "messages")))
            env["PATH"] = [os.path.expanduser("~/go/bin")]

        # Generate protobuf messages
        message_folder = os.path.join(self.source_folder, "messages")
        messages = [os.path.join(message_folder, it) for it in os.listdir(message_folder) if it.endswith(".proto")]
        command = "protoc --proto_path={}".format(message_folder)
        command += " --cpp_out={}".format(os.path.join(self.source_folder, "library", "messages"))
        for it in ["csharp", "java", "js", "objc", "php", "python", "ruby", "go"]:
            if getattr(self.options, it):
                binding_folder = os.path.join(self.source_folder, "bindings", it, "messages")
                os.makedirs(binding_folder, exist_ok=True)
                command += " --{}_out={}".format(it, binding_folder)
        command += " {}".format(" ".join(messages))
        with tools.environment_append(env):
            self.run(command)

    def _cmake(self):
        cmake = CMake(self)
        cmake.configure()
        return cmake

    def build(self):
        cmake = self._cmake()
        cmake.build()
    
    def package(self):
        cmake = self._cmake()
        cmake.install()
