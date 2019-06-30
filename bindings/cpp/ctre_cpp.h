#pragma once

#include <string>
#include "bindings/cpp/ctre_cpp_export.h"

namespace ctre { namespace cpp {

    class CTRE_CPP_EXPORT ctre {
        public:
            ctre(const std::string& path_to_lbrary);
            ~ctre();

            bool match(int regex_id, const std::string& text);

        protected:
            struct Impl;
            std::unique_ptr<Impl> _impl;
    };

}}
