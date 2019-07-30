cmake_minimum_required(VERSION 3.8.0)

configure_file(Cargo.toml.template ${CMAKE_CURRENT_BINARY_DIR}/Cargo.toml @ONLY)

# Add --release for a release build
add_custom_target(bindings_rust
        COMMAND cargo build --manifest-path ${CMAKE_CURRENT_BINARY_DIR}/Cargo.toml
        COMMENT "Compile Rust bindings")
set_target_properties(bindings_rust PROPERTIES LOCATION ${CMAKE_CURRENT_BINARY_DIR}/target/$<CONFIG>/libcrnd.rlib)
