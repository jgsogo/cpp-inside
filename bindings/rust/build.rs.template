extern crate protobuf_codegen_pure;


fn main() {
    protobuf_codegen_pure::run(protobuf_codegen_pure::Args {
        out_dir: "@CMAKE_CURRENT_SOURCE_DIR@/src/protos",
        input: &["@CMAKE_CURRENT_SOURCE_DIR@/../../messages/help.proto",
                 "@CMAKE_CURRENT_SOURCE_DIR@/../../messages/model.proto",
                 "@CMAKE_CURRENT_SOURCE_DIR@/../../messages/sample.proto",
                 "@CMAKE_CURRENT_SOURCE_DIR@/../../messages/sample_request.proto",
                 "@CMAKE_CURRENT_SOURCE_DIR@/../../messages/status.proto"],
        includes: &["@CMAKE_CURRENT_SOURCE_DIR@/../../messages"],
        customize: protobuf_codegen_pure::Customize {
            ..Default::default()
        },
    }).expect("protoc");
}
