cmake_minimum_required(VERSION 3.8.0)

# Generate protobuffers
file(GLOB PROTO_HDRS *.pb.h)
file(GLOB PROTO_SRCS *.pb.cc)

add_library(messages STATIC ${PROTO_SRCS} ${PROTO_HDRS})
target_link_libraries(messages protobuf::protobuf)
target_include_directories(messages INTERFACE
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/..>
    $<INSTALL_INTERFACE:include>)
set_target_properties(messages PROPERTIES LINKER_LANGUAGE CXX)
