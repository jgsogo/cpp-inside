#include "../include/api_cpp.h"


std::unique_ptr<ctre::Status> match(const ctre::Query& query, ctre::Match& match) {
    std::unique_ptr<ctre::Status> status = std::make_unique<ctre::Status>();
    try
    {
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