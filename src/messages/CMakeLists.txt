cmake_minimum_required(VERSION 3.8.0)

# Generate protobuffers
file(GLOB PROTO_FILES *.proto)
protobuf_generate_cpp(PROTO_SRCS PROTO_HDRS ${PROTO_FILES})

add_library(messages STATIC ${PROTO_SRCS} ${PROTO_HDRS} ${PROTO_FILES} protobuf::protobuf)
