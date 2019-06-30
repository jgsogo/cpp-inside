#pragma once

#include "ctre_wrapper/ctre_wrapper_export.h"
//#include <stdint.h>

extern "C" {
    typedef void (*callback_t)(void* state, const void* data, const void* status);

	CTRE_WRAPPER_EXPORT void match(void* state, const void* query_in, callback_t match_callback);
}

