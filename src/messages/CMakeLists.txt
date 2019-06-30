cmake_minimum_required(VERSION 3.8.0)

# Generate protobuffers
file(GLOB PROTO_HDRS *.pb.h)
file(GLOB PROTO_SRCS *.pb.h)

add_library(messages STATIC ${PROTO_SRCS} ${PROTO_HDRS})
target_link_libraries(messages protobuf::protobuf)
