import shutil
import os
from conans import ConanFile, tools, CMake

class CppInside(ConanFile):
    name = "cpp-inside"
    version = "1.0"

    settings = "os", "arch", "compiler", "build_type"
    generators = "cmake_find_package", "cmake_paths"
    options = {"ctre_version": "ANY",
               #"cpp": [True, False],  # It is always generated
               "csharp": [True, False],
               "java": [True, False],
               "js": [True, False],
               "objc": [True, False],
               "php": [True, False],
               "python": [True, False],
               "ruby": [True, False],
               }
    default_options = {"ctre_version": "2.6.4",
                       #"cpp": True,
                       "csharp": True,
                       "java": True,
                       "js": True,
                       "objc": True,
                       "php": True,
                       "python": True,
                       "ruby": True,
                       }

    exports_sources = "library/*"

    def build_requirements(self):
        self.build_requires("protoc_installer/3.6.1@bincrafters/stable")

    def requirements(self):
        self.requires("protobuf/3.6.1@bincrafters/stable")
        self.requires("boost/1.70.0@conan/stable")
        self.requires("spdlog/1.3.1@bincrafters/stable")

    def source(self):
        ctre_folder = os.path.join(self.source_folder, "library", "ctre")
        if not os.path.exists(ctre_folder):
            url = "https://github.com/hanickadot/compile-time-regular-expressions/archive/v{ctre_version}.tar.gz"
            tools.get(url.format(ctre_version=self.options.ctre_version))
            shutil.move("compile-time-regular-expressions-{}".format(self.options.ctre_version), ctre_folder)
            
        # Generate protobuf messages
        message_folder = os.path.join(self.source_folder, "messages")
        messages = [os.path.join(message_folder, it) for it in os.listdir(message_folder) if it.endswith(".proto")]
        command = "protoc --proto_path={}".format(message_folder)
        command += " --cpp_out={}".format(os.path.join(self.source_folder, "library", "messages"))
        for it in ["csharp", "java", "js", "objc", "php", "python", "ruby"]:
            if getattr(self.options, it):
                binding_folder = os.path.join(self.source_folder, "bindings", it, "messages")
                os.makedirs(binding_folder, exist_ok=True)
                command += " --{}_out={}".format(it, binding_folder)
        command += " {}".format(" ".join(messages))
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
