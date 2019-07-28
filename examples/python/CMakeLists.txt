cmake_minimum_required(VERSION 3.8.0)

add_custom_target(example_python_sh
        COMMAND ${CMAKE_COMMAND}
        "-DCRND_FILE=\"$<TARGET_FILE:crnd>\""
        "-DEXAMPLE_PYTHON_FILE=\"${CMAKE_CURRENT_SOURCE_DIR}/main.py\""
        "-DOUTPUT_FILE=${CMAKE_CURRENT_BINARY_DIR}/run.sh"
        -P ${CMAKE_CURRENT_SOURCE_DIR}/create_run.cmake)
