
if (${EXAMPLE_CPP})
    add_subdirectory(cpp)
endif()

if (${EXAMPLE_PYTHON})
    add_subdirectory(python)
endif()

if (${EXAMPLE_JAVA})
    add_subdirectory(java)
endif()

if (${EXAMPLE_GO})
    add_subdirectory(go)
endif()

if (${EXAMPLE_RUST})
    add_subdirectory(rust)
endif()
