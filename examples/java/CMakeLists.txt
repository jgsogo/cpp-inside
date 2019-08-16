
get_target_property(SOURCE_BINDINGS_DIR binding_java SOURCE_DIR)

add_custom_target(example_java ALL "${CMAKE_COMMAND}"
        "-DSOURCE_DIR=${CMAKE_CURRENT_SOURCE_DIR}"
        "-DSOURCE_BINDINGS_DIR=${SOURCE_BINDINGS_DIR}"
        "-DCRND_LIBRARY_PATH=\"$<TARGET_FILE:crnd>\""
        -P ${CMAKE_CURRENT_SOURCE_DIR}/generate_java.cmake)

add_custom_command(TARGET example_java
        COMMAND ${CMAKE_COMMAND}
        "-DCRND_FILE=\"$<TARGET_FILE:crnd>\""
        "-DTARGET_FILE=\"${CMAKE_CURRENT_BINARY_DIR}/target/CRND-EXAMPLE-1.0-SNAPSHOT-jar-with-dependencies.jar\""
        "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
        -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake
        )
