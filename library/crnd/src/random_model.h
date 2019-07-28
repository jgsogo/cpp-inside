
#pragma once

#include <random>
#include <sstream>
#include "messages/model.pb.h"


float get_param(const crnd::Model& model, const std::string& param_name) {
    auto f = model.params().find(param_name);
    if (f != model.params().end()) {
        return f->second;
    }
    else {
        std::ostringstream ss; ss << "Parameter '" << param_name << "' not found for model '" << crnd::Model_Name_Name(model.id()) << "'";
        throw std::runtime_error{ss.str()};
    }
}

template <class URNG, typename T = float>
auto get_random_generator(const crnd::Model& model) -> std::function<T (URNG&)> {
    switch (model.id()) {
        case crnd::Model_Name_BERNOULLI: {
            auto p = get_param(model, "p");
            std::bernoulli_distribution d{p};
            return d;
        }
        case crnd::Model_Name_UNIFORME: {
            return std::uniform_real_distribution<T>{};
        }
        case crnd::Model_Name_NORMAL: {
            auto mean = get_param(model, "mean");
            auto stddev = get_param(model, "stddev");
            return std::normal_distribution<T>{mean, stddev};
        }
        case crnd::Model_Name_BINOMIAL: {
            auto n = get_param(model, "n");
            auto p = get_param(model, "p");
            std::binomial_distribution d{n, p};
            return d;
        }
        case crnd::Model_Name_GEOMETRICAL: {
            auto p = get_param(model, "p");
            std::geometric_distribution d{p};
            return d;
        }
        case crnd::Model_Name_LOGNORMAL: {
            auto m = get_param(model, "mean");
            auto s = get_param(model, "stddev");
            std::lognormal_distribution d{m, s};
            return d;
        }
        case crnd::Model_Name_DISCRETE:
        default:
            throw std::runtime_error{"Model '{}' not recognized"};
    }
}
