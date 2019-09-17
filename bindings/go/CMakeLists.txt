cmake_minimum_required(VERSION 3.8.0)

#configure_file(crnd.go.template ${CMAKE_CURRENT_SOURCE_DIR}/crnd.go @ONLY)


add_custom_target(bindings_go COMMENT "Go bindings")
set_target_properties(bindings_go PROPERTIES LOCATION ${CMAKE_CURRENT_SOURCE_DIR})

add_custom_command(TARGET bindings_go
        PRE_BUILD
        COMMAND ${CMAKE_COMMAND}
        "-DCRND_LIBRARY_PATH=\"$<TARGET_FILE:crnd>\""
        "-DCURRENT_SOURCE_DIR=\"${CMAKE_CURRENT_SOURCE_DIR}\""
        "-DCRND_GO_TEMPLATE=\"${CMAKE_CURRENT_SOURCE_DIR}/crnd.go.template\""
        "-DCRND_GO_TEMPLATE_OUTPUT=\"${CMAKE_CURRENT_SOURCE_DIR}/crnd.go\""
        -P ${CMAKE_CURRENT_SOURCE_DIR}/create_crnd_go.cmake)

file(RELATIVE_PATH rel ${CMAKE_CURRENT_BINARY_DIR} ${CMAKE_CURRENT_SOURCE_DIR})
add_custom_command(TARGET bindings_go
        POST_BUILD
        COMMAND go build ${rel}
        COMMENT "Compile Go bindings")

add_dependencies(bindings_go crnd)
