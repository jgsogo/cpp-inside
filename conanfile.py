import shutil
from conans import ConanFile, tools, CMake

class CppInside(ConanFile):
    name = "cpp-inside"
    version = "1.0"

    settings = "os", "arch", "compiler", "build_type"
    generators = "cmake_find_package", "cmake_paths"
    options = {"ctre_version": "ANY"}
    default_options = {"ctre_version": "2.6.4"}

    exports_sources = "src/*"

    def build_requirements(self):
        self.build_requires("protoc_installer/3.6.1@bincrafters/stable")

    def requirements(self):
        self.require("protobuf/3.6.1@bincrafters/stable")

    def source(self):
        url = "https://github.com/hanickadot/compile-time-regular-expressions/archive/v{ctre_version}.tar.gz"
        tools.get(url.format(ctre_version=self.options.ctre_version))
        shutil.move("ctre-{}".format(self.options.ctre_version), "src/ctre")

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
