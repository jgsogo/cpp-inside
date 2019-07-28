#pragma once

#include <string>
#include "bindings/cpp/crnd_cpp_export.h"

namespace crnd { namespace cpp {

    class CRND_CPP_EXPORT crnd {
        public:
            crnd(const std::string& path_to_lbrary);
            ~crnd();

            void help(std::ostream& os);
            std::vector<float> bernoulli(float seed, int samples, float p);

        protected:
            struct Impl;
            std::unique_ptr<Impl> _impl;
    };

}}
