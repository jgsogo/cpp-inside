cmake_minimum_required(VERSION 3.8.0)

set(CMAKE_CXX_STANDARD 17)

add_executable(example_cpp main.cpp)
target_link_libraries(example_cpp PRIVATE crnd_cpp CONAN_PKG::boost)
target_include_directories(example_cpp
    PRIVATE
        $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}>
)

add_custom_target(GenexDemo
  COMMAND ${CMAKE_COMMAND}
  "-DCRND_FILE=\"$<TARGET_FILE:crnd>\""
  "-DEXAMPLE_CPP_FILE=\"$<TARGET_FILE:example_cpp>\""
  "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
  -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake)
