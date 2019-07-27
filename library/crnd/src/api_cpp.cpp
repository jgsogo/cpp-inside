#include "../include/api_cpp.h"

#include <random>
#include "spdlog/spdlog.h"


namespace {
    std::unique_ptr<crnd::Status> with_status(std::function<void (crnd::Status&)> f) {
        std::unique_ptr<crnd::Status> status = std::make_unique<crnd::Status>();
        status->set_ok(true);
        try {
            f(*status);
        }
        catch (std::exception& e) {
            status->set_ok(false);
            status->set_error_code(1);
            status->set_error_message(e.what());
        }
        return status;
    }
}

std::unique_ptr<crnd::Status> help(crnd::Help& help) {
    SPDLOG_DEBUG("> C++::help");
    return with_status([&help](crnd::Status& status) {
        
    });
}

std::unique_ptr<crnd::Status> sample(const crnd::SampleRequest& request, crnd::Sample& sample) {
    SPDLOG_DEBUG("> C++::sample");
    return with_status([&request, &sample](crnd::Status& status) {
        
    });
}
