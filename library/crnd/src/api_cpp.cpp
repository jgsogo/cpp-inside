#include "../include/api_cpp.h"

#include <random>
#include "spdlog/spdlog.h"
#include "random_model.h"


namespace {
    std::unique_ptr<crnd::Status> with_status(std::function<void (crnd::Status&)> f) {
        std::unique_ptr<crnd::Status> status = std::make_unique<crnd::Status>();
        try {
            status->set_ok(true); // Set it to true first, so the function may modify it.
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
        help.set_name("crnd");
        help.set_description("Generate random numbers");

        help.set_version("xxxx");

    });
}

std::unique_ptr<crnd::Status> sample(const crnd::SampleRequest& request, crnd::Sample& sample) {
    SPDLOG_DEBUG("> C++::sample");
    return with_status([&request, &sample](crnd::Status& status) {
        std::mt19937 gen(request.seed());
        auto model = get_random_generator<std::mt19937>(request.model());

        sample.mutable_model()->CopyFrom(request.model());
        sample.set_seed(request.seed());
        for (int i=0; i<request.n_samples(); i++) {
            sample.add_samples(model(gen));
        }
    });
}
