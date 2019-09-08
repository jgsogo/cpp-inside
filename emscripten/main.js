
var help_pb = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/messages/help_pb.js');
var sample_pb = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/messages/sample_pb.js');
var model_pb = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/messages/model_pb.js');
var sample_request_pb = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/messages/sample_request_pb.js');

parse_help = function (data) {
    json = JSON.parse(UTF8ToString(data));
    var message = new help_pb.Help();
    message.setName(json["name"]);
    message.setDescription(json["description"]);
    message.setVersion(json["version"]);
    return message;
}

parse_sample = function (data) {
    json = JSON.parse(UTF8ToString(data));

    var model = new model_pb.Model();
    model.setId(json["model"]["id"]);
    model.getParamsMap()["mean"] = json["model"]["mean"];
    model.getParamsMap()["stddev"] = json["model"]["stddev"];

    var message = new sample_pb.Sample();
    message.setModel(model);
    message.setSeed(json["seed"]);
    message.setSamplesList(json["samples"]);
    
    return message;
}

serialize_sample_request = function(sample_request) {
    var model = sample_request.getModel();
    var params = model.getParamsMap();
    return JSON.stringify({
        "model": {
            "id": "LOGNORMAL",
            "params": {
                "mean": params["mean"],
                "stddev": params["stddev"]
            }
        },
        "seed": sample_request.getSeed(),
        "nSamples": sample_request.getNSamples()
    });
}


module.exports = {parse_help: parse_help, parse_sample: parse_sample, serialize_sample_request: serialize_sample_request, sample_request_pb: sample_request_pb, model_pb: model_pb};
