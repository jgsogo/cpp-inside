#include "../include/api_c.h"

#include "spdlog/spdlog.h"

#include "../include/api_cpp.h"
#include "serialization.h"
#include <google/protobuf/util/json_util.h>


extern "C" {

    void help(void* state, callback_t help_callback) {
        SPDLOG_DEBUG("> C::help");

        crnd::Help help_message;
        auto status = help(help_message);

        SPDLOG_TRACE("C::help::before callback");
        //help_callback(state, Serialized<crnd::Help>(help_message), Serialized<crnd::Status>(*status));
        std::string data;
        google::protobuf::util::MessageToJsonString(help_message, &data);
        
        std::string status_str;
        google::protobuf::util::MessageToJsonString(*status, &status_str);

        help_callback(state, (void*)data.c_str(), (void*)status_str.c_str());
        SPDLOG_TRACE("C::help::after callback");
        SPDLOG_DEBUG("< C::help");
    }

    void sample(void* state, char* sample_request_in, callback_t sample_callback) {
        SPDLOG_DEBUG("> C::sample");

        std::string sp(sample_request_in);
        crnd::SampleRequest request_message;
        google::protobuf::util::JsonStringToMessage(sp, &request_message);
        
        crnd::Sample sample_message;
        auto status = sample(request_message, sample_message);

        SPDLOG_TRACE("C::sample::before callback");
        std::string data;
        google::protobuf::util::MessageToJsonString(sample_message, &data);
        
        std::string status_str;
        google::protobuf::util::MessageToJsonString(*status, &status_str);

        sample_callback(state, (void*)data.c_str(), (void*)status_str.c_str());
        SPDLOG_TRACE("C::sample::after callback");
        
        SPDLOG_DEBUG("< C::sample");
    }
}