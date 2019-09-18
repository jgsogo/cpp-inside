const ffi = require("ffi");
const ref = require('ref');
const Struct = require('ref-struct');
const status_pb = require('./messages/status_pb.js');
const help_pb = require('./messages/help_pb.js');
const model_pb = require('./messages/model_pb.js');
const sample_pb = require('./messages/sample_pb.js');
const sample_request_pb = require('./messages/sample_request_pb.js');



const Serialized = Struct({
    data: 'void *',
    size: ref.types.int64,
});
const SerializedPtr = ref.refType(Serialized);

module.exports = {
    help: function (path_to_lib) {
        try {
            const crnd = ffi.Library(path_to_lib, {
                help: ['void', ['void *', 'pointer']]
            });

            let help = null;
            const callback = ffi.Callback('void', ['void *', SerializedPtr, SerializedPtr],
                function (state, data_in, status_in) {
                    console.log("> nodejs::callback");
                    let data = data_in.deref();
                    data = ref.reinterpret(data.data, data.size);
                    help = help_pb.Help.deserializeBinary(data);
                    console.log("< nodejs::callback");
                });

            console.log("> nodejs::help");
            crnd.help(null, callback);
            console.log("< nodejs::help");
            return help;
        } catch (e) {
            console.error("error", e.message);
        }
    },

    lognormal: function (path_to_lib, seed, n_samples, mu, sigma) {
        try {
            let model = new model_pb.Model();
            model.setId(model_pb.Model.Name.LOGNORMAL);
            model.getParamsMap().set("mean", mu);
            model.getParamsMap().set("stddev", sigma);

            let sample_request = new sample_request_pb.SampleRequest();
            sample_request.setSeed(seed);
            sample_request.setNSamples(n_samples);
            sample_request.setModel(model);

            let sample = null;
            const callback = ffi.Callback('void', ['void *', SerializedPtr, SerializedPtr],
                function(state, data_in, status_in) {
                    console.log("> nodejs::callback");
                    let data = data_in.deref();
                    data = ref.reinterpret(data.data, data.size);
                    sample = sample_pb.Sample.deserializeBinary(data);
                    console.log("< nodejs::callback");
                });

            const crnd = ffi.Library(path_to_lib, {
                sample: ['void', ['void *', SerializedPtr, 'pointer']]
            });

            let buffer = sample_request.serializeBinary();
            let sample_request_serialized = Serialized();
            sample_request_serialized.data = buffer;
            sample_request_serialized.size = buffer.length;
            let refSR = sample_request_serialized.ref();

            console.log("> nodejs::sample");
            crnd.sample(null, refSR, callback);
            console.log("< nodejs::sample");

            return sample;
        }
        catch (e) {
            console.error("error", e.message);
        }
    }
};

