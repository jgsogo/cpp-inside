cmake_minimum_required(VERSION 3.8.0)


add_custom_target(exmaple_rust
  COMMAND rustc ${CMAKE_CURRENT_SOURCE_DIR}/main.rs
  COMMENT "Compile Rust executable")

add_custom_command(TARGET exmaple_rust
        POST_BUILD
        COMMAND ${CMAKE_COMMAND}
        "-DCRND_LIBRARY=\"$<TARGET_FILE:crnd>\""
        "-DEXECUTABLE_RUST=\"${CMAKE_CURRENT_BINARY_DIR}/main\""
        "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
        -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake)
