
get_target_property(SOURCE_BINDINGS_DIR binding_java SOURCE_DIR)

add_custom_target(example_java ALL "${CMAKE_COMMAND}"
        "-DSOURCE_DIR=${CMAKE_CURRENT_SOURCE_DIR}"
        "-DSOURCE_BINDINGS_DIR=${SOURCE_BINDINGS_DIR}"
        "-DCRND_LIBRARY_PATH=\"$<TARGET_FILE:crnd>\""
        -P ${CMAKE_CURRENT_SOURCE_DIR}/generate_java.cmake)
