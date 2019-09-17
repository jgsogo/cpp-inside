#include "../include/api_c.h"

#include "spdlog/spdlog.h"

#include "../include/api_cpp.h"
#include "serialization.h"


extern "C" {

    void help(void* state, callback_t help_callback) {
        SPDLOG_DEBUG("> C::help");

        crnd::Help help_message;
        auto status = help(help_message);
        auto status_serialized = Serialized<crnd::Help>(help_message);
        SPDLOG_TRACE("C::help::before callback - size: {}", status_serialized.size);
        SPDLOG_TRACE("C::help::before callback - data: {}", status_serialized.data);

        SPDLOG_TRACE("C::help::before callback");
        help_callback(state, Serialized<crnd::Help>(help_message), Serialized<crnd::Status>(*status));
        SPDLOG_TRACE("C::help::after callback");
        SPDLOG_DEBUG("< C::help");
    }

    void sample(void* state, const void* sample_request_in, callback_t sample_callback) {
        SPDLOG_DEBUG("> C::sample");

        crnd::SampleRequest request_message = Serialized<crnd::SampleRequest>::parse(sample_request_in);
        crnd::Sample sample_message;
        auto status = sample(request_message, sample_message);

        SPDLOG_TRACE("C::sample::before callback");
        sample_callback(state, Serialized<crnd::Sample>(sample_message), Serialized<crnd::Status>(*status));
        SPDLOG_TRACE("C::sample::after callback");
        
        SPDLOG_DEBUG("< C::sample");
    }
}