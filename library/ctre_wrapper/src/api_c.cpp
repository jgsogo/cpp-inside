#include "../include/api_c.h"

#include "spdlog/spdlog.h"

#include "messages/status.pb.h"
#include "messages/query.pb.h"
#include "messages/match.pb.h"

#include "../include/api_cpp.h"
#include "serialization.h"


extern "C" {
    void match(void* state, const void* query_in, callback_t match_callback)
    {
        SPDLOG_DEBUG("C::match");

        ctre::Query query_message = Serialized<ctre::Query>::parse(query_in);
        ctre::Match match_message;
        auto status = match(query_message, match_message);

        SPDLOG_TRACE("C::before callback");
        match_callback(state, Serialized<ctre::Match>(match_message), Serialized<ctre::Status>(*status));
        SPDLOG_TRACE("C::after callback");
    }
}