cmake_minimum_required(VERSION 3.8.0)

if(${BINDINGS_CPP})
    add_subdirectory(cpp)
endif()

if(${BINDINGS_JAVA})
    add_subdirectory(java)
endif()

if (${BINDINGS_GO})
    add_subdirectory(go)
endif()

if (${BINDINGS_RUST})
    add_subdirectory(rust)
endif()
