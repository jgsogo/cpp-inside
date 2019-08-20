cmake_minimum_required(VERSION 3.8.0)

get_target_property(CRND_LIBRARY bindings_rust LOCATION)
message(">>>>> CRND_LIBRARY: ${CRND_LIBRARY}")

#add_custom_target(exmaple_rust
#  COMMAND rustc ${CMAKE_CURRENT_SOURCE_DIR}/main.rs --extern crnd=${CRND_LIBRARY}
#  COMMENT "Compile Rust executable")

configure_file(Cargo.toml.template ${CMAKE_CURRENT_BINARY_DIR}/Cargo.toml @ONLY)

add_custom_target(exmaple_rust
        COMMAND cargo build --manifest-path ${CMAKE_CURRENT_BINARY_DIR}/Cargo.toml
        COMMENT "Compile Rust example")


add_custom_command(TARGET exmaple_rust
        POST_BUILD
        COMMAND ${CMAKE_COMMAND}
        "-DCRND_LIBRARY=\"$<TARGET_FILE:crnd>\""
        "-DEXECUTABLE_RUST=\"${CMAKE_CURRENT_BINARY_DIR}/target/debug/example_rust\""
        "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
        -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake)

