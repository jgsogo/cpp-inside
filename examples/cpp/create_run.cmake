
message("Generate file '${OUTPUT_FILE}'")
file(WRITE ${OUTPUT_FILE} "${EXAMPLE_CPP_FILE} --ctre_wrapper=${CTRE_WRAPPER_FILE}")

get_filename_component(OUTPUT_FILE_DIRECTORY ${OUTPUT_FILE} DIRECTORY)
file(COPY ${OUTPUT_FILE}
     DESTINATION ${OUTPUT_FILE_DIRECTORY}
     FILE_PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE
     )
