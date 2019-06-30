cmake_minimum_required(VERSION 3.8.0)

find_package(boost REQUIRED)

set(CMAKE_CXX_STANDARD 11)

add_executable(example_cpp main.cpp)
target_link_libraries(example_cpp PRIVATE ctre_cpp boost::boost)
target_include_directories(example_cpp
    PRIVATE
        $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}>
)

add_custom_target(GenexDemo
  COMMAND ${CMAKE_COMMAND}
  "-DCTRE_WRAPPER_FILE=\"$<TARGET_FILE:ctre_wrapper>\""
  "-DEXAMPLE_CPP_FILE=\"$<TARGET_FILE:example_cpp>\""
  "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
  -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake)
