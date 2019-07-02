#include "../include/api_cpp.h"

#include <ctre.hpp>
#include "spdlog/spdlog.h"

static constexpr auto pattern = ctll::fixed_string{ "(\\d{4})/(\\d{1,2})/(\\d{1,2})" };
static constexpr auto re_is_prime = ctll::fixed_string{ ".?|(..+?)\1+"};

std::unique_ptr<ctre::Status> match(const ctre::Query& query, ctre::Match& match) {
    SPDLOG_DEBUG("C++::match");

    std::unique_ptr<ctre::Status> status = std::make_unique<ctre::Status>();
    try
    {
        /*
        auto m = ctre::match<pattern>(query.text());
        match.set_match(m);
        match.set_regex_id(query.regex_id());
        match.set_regex(std::string(pattern.begin(), pattern.end()));
        */
        int number = std::stoi( query.text() );
        auto str = std::string(number, '1');
        SPDLOG_DEBUG(" - {}: {}", number, str);
        auto m = ctre::match<re_is_prime>(str);
        match.set_match(m);
        match.set_regex_id(query.regex_id());
        match.set_regex(std::string(re_is_prime.begin(), re_is_prime.end()));

        status->set_ok(true);
    }
    catch (std::exception& e)
    {
        status->set_ok(false);
        status->set_error_code(1);
        status->set_error_message(e.what());
    }

    return status;
}