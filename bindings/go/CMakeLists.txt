cmake_minimum_required(VERSION 3.8.0)

file(RELATIVE_PATH rel ${CMAKE_CURRENT_BINARY_DIR} ${CMAKE_CURRENT_SOURCE_DIR})
add_custom_target(bindings_go
        COMMAND go build ${rel}
        COMMENT "Compile Go bindings")
set_target_properties(bindings_go PROPERTIES LOCATION ${CMAKE_CURRENT_SOURCE_DIR})
