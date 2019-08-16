cmake_minimum_required(VERSION 3.8.0)

get_target_property(CRND_GO_LIBRARY bindings_go LOCATION)
message(">>>>> CRND_GO_LIBRARY: ${CRND_GO_LIBRARY}")
file(RELATIVE_PATH CRND_GO_LIBRARY_PATH_REL ${CMAKE_CURRENT_BINARY_DIR} ${CRND_GO_LIBRARY})

configure_file(main.go.template ${CMAKE_CURRENT_BINARY_DIR}/main.go @ONLY)

add_custom_target(exmaple_go
        COMMAND go build main.go
        COMMENT "Compile Go executable")

add_custom_command(TARGET exmaple_go
        POST_BUILD
        COMMAND ${CMAKE_COMMAND}
        "-DCRND_LIBRARY=\"$<TARGET_FILE:crnd>\""
        "-DEXECUTABLE_GO=\"${CMAKE_CURRENT_BINARY_DIR}/main\""
        "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
        -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake)

add_dependencies(exmaple_go bindings_go)
