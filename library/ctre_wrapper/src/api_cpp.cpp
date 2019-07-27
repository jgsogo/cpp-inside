#include "../include/api_cpp.h"

#include <random>
#include <ctre.hpp>
#include "spdlog/spdlog.h"

static constexpr auto pattern = ctll::fixed_string{ "(\\d{4})/(\\d{1,2})/(\\d{1,2})" };
static constexpr auto re_is_prime = ctll::fixed_string{ ".?|(..+?)\\g{1}+"};

std::unique_ptr<ctre::Status> match(const ctre::Query& query, ctre::Match& match) {
    SPDLOG_DEBUG("C++::match");

    std::unique_ptr<ctre::Status> status = std::make_unique<ctre::Status>();
    try
    {
        if (query.regex_id() == 1)
        {
            int number = std::stoi( query.text() );
            auto str = std::string(number, '1');
            //SPDLOG_DEBUG(" - {}: {}", number, str);
            auto m = ctre::match<re_is_prime>(str);
            match.set_match(m);
            match.set_regex_id(query.regex_id());
            match.set_regex(std::string(re_is_prime.begin(), re_is_prime.end()));
        }
        else 
        {
            std::mt19937 generator(10);
            std::uniform_real_distribution<double> dis(0.0, 1.0);
            float f = dis(generator);
            
            SPDLOG_DEBUG(" - randome: {}", f);
            SPDLOG_DEBUG(" - {:f} + {:+f} = {:+f}", 0.1, 0.2, 0.1f + 0.2f);
            fmt::print("{0:0.15f}\n", 0.1f + 0.2f);
            fmt::print("{0:0.15f}\n", 0.3f);
            bool mm = (0.1f + 0.2f == 0.4f);
            match.set_match(mm);
            match.set_regex_id(query.regex_id());
            match.set_regex(std::to_string(f));
        }

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