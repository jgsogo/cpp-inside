#include "crnd_cpp.h"

#include <functional>
#include <boost/dll/import.hpp>
#include <boost/function.hpp>

#include "messages/status.pb.h"
#include "messages/help.pb.h"
#include "messages/sample.pb.h"
#include "messages/sample_request.pb.h"

#include "api_wrapper.h"
#include "serialization.h"


namespace crnd { namespace cpp {

    namespace {
        template <typename T>
        std::function<void(const void*, const void*)> response_callback(T& t, ::crnd::Status& status)
        {
            std::function<void(const void*, const void*)> callback = [&t, &status](const void* data, const void* status_in) {
                status = Serialized<::crnd::Status>::parse(status_in);
                t = Serialized<T>::parse(data);
            };
            return callback;
        }
    }


    struct crnd::Impl
    {
        typedef void(*callback_t)(void*, const void*, const void*);

        Impl() {}

        std::string _path;
        boost::function<void(void* state, callback_t)> help_fn;
        boost::function<void(void* state, const void* sample_request, callback_t)> sample_fn;
    };


    crnd::crnd(const std::string& path_to_lbrary) : _impl(new Impl) {
        _impl->_path = path_to_lbrary;
        _impl->help_fn = boost::dll::import<void(void*, Impl::callback_t)>(_impl->_path, "help");
        _impl->sample_fn = boost::dll::import<void(void*, const void*, Impl::callback_t)>(_impl->_path, "sample");
    }

    crnd::~crnd() {}

    void crnd::help(std::ostream& os) {
        ::crnd::Help help_message;
        std::unique_ptr<::crnd::Status> status = std::make_unique<::crnd::Status>();
        auto callback = response_callback(help_message, *status);
        auto wrapper = make_wrapper(callback);

        _impl->help_fn(wrapper.second, wrapper.first);

        // TODO: Handle status

    }

    std::vector<float> crnd::bernoulli(float seed, int samples, float p) {
        ::crnd::Sample sample_message;
        std::unique_ptr<::crnd::Status> status = std::make_unique<::crnd::Status>();
        auto callback = response_callback(sample_message, *status);
        auto wrapper = make_wrapper(callback);

        ::crnd::SampleRequest request;
        request.set_seed(seed);
        request.set_n_samples(samples);
        auto model = request.mutable_model();
        model->set_id(::crnd::Model_Name_BERNOULLI);
        (*model->mutable_params())["p"] = p;

        _impl->sample_fn(wrapper.second, Serialized<::crnd::SampleRequest>(request), wrapper.first);

        // TODO: Handle status
        return std::vector<float>{};
    }

}}

