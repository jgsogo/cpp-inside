cmake_minimum_required(VERSION 3.8.0)

include(GenerateExportHeader)
find_package(protobuf REQUIRED)

add_subdirectory(messages)


add_library(ctre_wrapper )
generate_export_header(ctre_wrapper)
