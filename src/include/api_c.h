#pragma once

#include "ctre_wrapper_export.h"
//#include <stdint.h>


extern "C" {
    typedef void (*callback_t)(void* state, const void* data, const void* status);

	CTRE_WRAPPER_EXPORT void match(void* state, const char* match, callback_t match_callback);
}

