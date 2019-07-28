# Generate Java project based on C++ CMake

message("Generate Java pom.xml at ${CMAKE_CURRENT_BINARY_DIR}/pom.xml")
message(">> SOURCE_DIR: ${SOURCE_DIR}")
message(">> SOURCE_BINDINGS_DIR: ${SOURCE_BINDINGS_DIR}")
message(">> CRND_LIBRARY_PATH: ${CRND_LIBRARY_PATH}")

configure_file(${SOURCE_DIR}/pom.xml.template ${CMAKE_CURRENT_BINARY_DIR}/pom.xml @ONLY)
configure_file(${SOURCE_DIR}/src/main/java/crnd/App.java.template ${CMAKE_CURRENT_BINARY_DIR}/src/main/java/crnd/App.java @ONLY)
