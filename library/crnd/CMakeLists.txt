cmake_minimum_required(VERSION 3.8.0)

include(GenerateExportHeader)

add_library(crnd SHARED
            src/api_c.cpp
            src/api_cpp.cpp
            include/api_c.h
            include/api_cpp.h
            )
generate_export_header(crnd)
target_link_libraries(crnd PRIVATE messages CONAN_PKG::spdlog)
target_include_directories(crnd
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/..>
    INTERFACE
        $<INSTALL_INTERFACE:include>)
target_compile_definitions(crnd PRIVATE SPDLOG_ACTIVE_LEVEL=0)

#define SPDLOG_LEVEL_TRACE 0
#define SPDLOG_LEVEL_DEBUG 1
#define SPDLOG_LEVEL_INFO 2
#define SPDLOG_LEVEL_WARN 3
#define SPDLOG_LEVEL_ERROR 4
#define SPDLOG_LEVEL_CRITICAL 5
#define SPDLOG_LEVEL_OFF 6

if (${EMSCRIPTEN})
    message("CMAKE_C_COMPILER: ${CMAKE_C_COMPILER}")
    message("CMAKE_CPP_COMPILER: ${CMAKE_CPP_COMPILER}")

    set(EXPORTED_FUNCTIONS
	  _help 
	  _sample
	)

    # process exported functions
    set(EXPORTED_FUNCTIONS_STR "")
    list(JOIN EXPORTED_FUNCTIONS "," EXPORTED_FUNCTIONS_STR)

    set(CMAKE_CXX_FLAGS "-s EXPORTED_FUNCTIONS=\"[${EXPORTED_FUNCTIONS_STR}]\" -s EXTRA_EXPORTED_RUNTIME_METHODS='[\"ccall\", \"cwrap\", \"addFunction\", \"removeFunction\"]' -s RESERVED_FUNCTION_POINTERS=10")

    set_target_properties(crnd PROPERTIES
            SUFFIX ".js"
            LINK_FLAGS "--emrun")

    install(FILES
            ${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/libcrnd.js
            ${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/libcrnd.wasm
            DESTINATION bin)
endif()

