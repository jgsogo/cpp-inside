#include "../include/api_c.h"


#include "messages/status.pb.h"
#include "messages/query.pb.h"
#include "messages/match.pb.h"

#include "../include/api_cpp.h"
#include "serialization.h"


void match(void* state, const void* query_in, callback_t match_callback)
{
    ctre::Query query_message = Serialized<ctre::Query>::parse(query_in);
    ctre::Match match_message;
    auto status = match(query_message, match_message);
    match_callback(state, Serialized<ctre::Match>(match_message), Serialized<ctre::Status>(*status));
}
