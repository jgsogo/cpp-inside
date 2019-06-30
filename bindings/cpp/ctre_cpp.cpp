#include "ctre_cpp.h"

#include <functional>
#include <boost/dll/import.hpp>
#include <boost/function.hpp>

#include "messages/status.pb.h"
#include "messages/query.pb.h"
#include "messages/match.pb.h"

#include "api_wrapper.h"
#include "serialization.h"


namespace ctre { namespace cpp {

    namespace {
        template <typename T>
        std::function<void(const void*, const void*)> response_callback(T& t, ::ctre::Status& status)
        {
            std::function<void(const void*, const void*)> callback = [&t, &status](const void* data, const void* status_in) {
                status = Serialized<::ctre::Status>::parse(status_in);
                t = Serialized<T>::parse(data);
            };
            return callback;
        }
    }


    struct ctre::Impl
    {
        typedef void(*callback_t)(void*, const void*, const void*);

        Impl() {}

        std::string _path;
        boost::function<void(void* state, const void* query, callback_t)> match_fn;
    };


    ctre::ctre(const std::string& path_to_lbrary) : _impl(new Impl) {
        _impl->_path = path_to_lbrary;
        _impl->match_fn = boost::dll::import<void(void*, const void*, Impl::callback_t)>(_impl->_path, "match");
    }

    ctre::~ctre() {}

    bool ctre::match(int regex_id, const std::string& text) {
        ::ctre::Match match_message;
        std::unique_ptr<::ctre::Status> status(new ::ctre::Status);
        auto callback = response_callback(match_message, *status);
        auto wrapper = make_wrapper(callback);

        ::ctre::Query query;
        query.set_regex_id(regex_id);
        query.set_text(text);
        _impl->match_fn(wrapper.second, Serialized<::ctre::Query>(query), wrapper.first);

        // TODO: Handle status
        return match_message.match();
    }

}}

