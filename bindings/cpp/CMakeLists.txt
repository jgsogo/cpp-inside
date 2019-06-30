cmake_minimum_required(VERSION 3.8.0)

include(GenerateExportHeader)

set(CMAKE_CXX_STANDARD 17)

find_package(boost REQUIRED)

add_library(ctre_cpp
                ctre_cpp.cpp
                ctre_cpp.h)
generate_export_header(ctre_cpp)
target_link_libraries(ctre_cpp PRIVATE messages boost::boost)
target_include_directories(ctre_cpp
    PRIVATE
        $<BUILD_INTERFACE:${CMAKE_SOURCE_DIR}/library/ctre_wrapper/src>
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_BINARY_DIR}>
    INTERFACE
        $<BUILD_INTERFACE:${CMAKE_SOURCE_DIR}>
        $<INSTALL_INTERFACE:include>)
