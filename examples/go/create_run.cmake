
message("Generate file '${OUTPUT_FILE}'")
get_filename_component(CRND_LIBRARY_DIRECTORY ${CRND_LIBRARY} DIRECTORY)
file(WRITE ${OUTPUT_FILE} "pushd ${CRND_LIBRARY_DIRECTORY}; ${EXECUTABLE_GO} --crnd=${CRND_LIBRARY}; popd")

get_filename_component(OUTPUT_FILE_DIRECTORY ${OUTPUT_FILE} DIRECTORY)
file(COPY ${OUTPUT_FILE}
        DESTINATION ${OUTPUT_FILE_DIRECTORY}
        FILE_PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE
        )