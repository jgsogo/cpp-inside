cmake_minimum_required(VERSION 3.8.0)

include(GenerateExportHeader)
find_package(spdlog REQUIRED)

add_library(ctre_wrapper SHARED
                src/api_c.cpp
                src/api_cpp.cpp
                include/api_c.h
                include/api_cpp.h
                )
generate_export_header(ctre_wrapper)
target_link_libraries(ctre_wrapper PRIVATE ctre messages spdlog::spdlog)
target_include_directories(ctre_wrapper
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/..>
    INTERFACE
        $<INSTALL_INTERFACE:include>)
target_compile_definitions(ctre_wrapper PRIVATE SPDLOG_ACTIVE_LEVEL=0)

#define SPDLOG_LEVEL_TRACE 0
#define SPDLOG_LEVEL_DEBUG 1
#define SPDLOG_LEVEL_INFO 2
#define SPDLOG_LEVEL_WARN 3
#define SPDLOG_LEVEL_ERROR 4
#define SPDLOG_LEVEL_CRITICAL 5
#define SPDLOG_LEVEL_OFF 6