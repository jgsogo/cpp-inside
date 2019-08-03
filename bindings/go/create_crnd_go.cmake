
message("create_crnd_go.cmake")
message(">>>> CRND_LIBRARY_PATH: ${CRND_LIBRARY_PATH}")

get_filename_component(CRND_LIBRARY_PATH ${CRND_LIBRARY_PATH} DIRECTORY)
configure_file(${CRND_GO_TEMPLATE} ${CRND_GO_TEMPLATE_OUTPUT} @ONLY)
