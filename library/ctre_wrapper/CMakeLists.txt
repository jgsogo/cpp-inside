cmake_minimum_required(VERSION 3.8.0)

include(GenerateExportHeader)

add_library(ctre_wrapper SHARED
                src/api_c.cpp
                src/api_cpp.cpp
                include/api_c.h
                include/api_cpp.h
                )
generate_export_header(ctre_wrapper)
target_link_libraries(ctre_wrapper PRIVATE ctre messages)
target_include_directories(ctre_wrapper
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/..>
    INTERFACE
        $<INSTALL_INTERFACE:include>)
