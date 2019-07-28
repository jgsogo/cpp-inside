# Generate Java project based on C++ CMake

message("Generate Java pom.xml at ${CMAKE_CURRENT_BINARY_DIR}/pom.xml")
message(">> ${SOURCE_DIR}")

configure_file(${SOURCE_DIR}/pom.xml.template ${CMAKE_CURRENT_BINARY_DIR}/pom.xml @ONLY)
