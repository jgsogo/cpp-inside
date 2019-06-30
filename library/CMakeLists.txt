cmake_minimum_required(VERSION 3.8.0)

find_package(protobuf REQUIRED)

set(CMAKE_CXX_STANDARD 17)

# Create CTRE target
add_library(ctre INTERFACE)
#add_library(ctre::ctre ALIAS ctre)
target_include_directories(ctre INTERFACE
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/ctre/include>
    $<INSTALL_INTERFACE:include>)
target_compile_features(ctre INTERFACE cxx_std_17)

# Messages
add_subdirectory(messages)

# CTRE wrapper
add_subdirectory(ctre_wrapper)
