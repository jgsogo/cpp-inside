cmake_minimum_required(VERSION 3.8.0)

#get_target_property(CRND_LIBRARY bindings_rust LOCATION)
#message(">>>>> CRND_LIBRARY: ${CRND_LIBRARY}")

add_custom_target(exmaple_go
        COMMAND go build ${CMAKE_CURRENT_SOURCE_DIR}/main.go
        COMMENT "Compile Go executable")

add_custom_command(TARGET exmaple_go
        POST_BUILD
        COMMAND ${CMAKE_COMMAND}
        "-DCRND_LIBRARY=\"$<TARGET_FILE:crnd>\""
        "-DEXECUTABLE_GO=\"${CMAKE_CURRENT_BINARY_DIR}/main\""
        "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
        -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake)