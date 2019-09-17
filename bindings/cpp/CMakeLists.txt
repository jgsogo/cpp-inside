cmake_minimum_required(VERSION 3.8.0)

include(GenerateExportHeader)

set(CMAKE_CXX_STANDARD 17)

add_library(bindings_cpp
        crnd_cpp.cpp
        crnd_cpp.h)
generate_export_header(bindings_cpp)
target_link_libraries(bindings_cpp PRIVATE messages CONAN_PKG::boost)
target_include_directories(bindings_cpp
    PRIVATE
        $<BUILD_INTERFACE:${CMAKE_SOURCE_DIR}/library/crnd/src>
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_BINARY_DIR}>
    INTERFACE
        $<BUILD_INTERFACE:${CMAKE_SOURCE_DIR}>
        $<INSTALL_INTERFACE:include>)
