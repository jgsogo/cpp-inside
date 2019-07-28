#pragma once

#include "crnd/crnd_export.h"

extern "C" {
    typedef void (*callback_t)(void* state, const void* data, const void* status);

    CRND_EXPORT void help(void* state, callback_t help_callback);
    CRND_EXPORT void sample(void* state, const void* sample_request_in, callback_t sample_callback);
}

