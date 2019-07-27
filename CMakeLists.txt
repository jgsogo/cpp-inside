cmake_minimum_required(VERSION 3.8.0)
project(cpp-inside VERSION 1.0 LANGUAGES C CXX)

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup(TARGETS)

add_subdirectory(library)

option(BUILD_BINDINGS "Build bindings" ON)
option(BUILD_EXAMPLES "Build examples" ON)

if(BUILD_BINDINGS)
    #add_subdirectory(bindings)
endif()

if (BUILD_EXAMPLES)
    #add_subdirectory(examples)
endif()
