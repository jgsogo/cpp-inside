const ffi = require("ffi");
var ref = require('ref');
var Struct = require('ref-struct');
var status_pb = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/messages/status_pb.js');
var help_pb = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/messages/help_pb.js');



var Serialized = Struct({
    data: 'void *',
    size: ref.types.int64,
});
//var Serialized = Struct();
//Serialized.defineProperty('data', 'void*'); //ref.refType(ref.types.void));
//Serialized.defineProperty('size', ref.types.int64);
var SerializedPtr = ref.refType(Serialized);


function getArgument(argument){
    var index = process.argv.indexOf(argument);
    return (index === -1) ? null : process.argv[index + 1];
}

var path_to_lib = getArgument('--crnd');

function help() {
    try {
        const crnd = ffi.Library(path_to_lib, {
            help: ['void', ['void *', 'pointer']]
        });

        // Callback from the native lib back into js
        var callback = ffi.Callback('void', ['void *', SerializedPtr, SerializedPtr],
            function(state, data_in, status_in) {
                console.log("> nodejs::callback");
                var data = data_in.deref();
                var data = ref.reinterpret(data.data, data.size);
                var it = help_pb.Help.deserializeBinary(data);
                console.log("name: ", it.getName());
                console.log("description: ", it.getDescription());
                console.log("version: ", it.getVersion());
                console.log("< nodejs::callback");
            });

        console.log("> nodejs::help");
        crnd.help(null, callback);
        console.log("< nodejs::help");
    }
    catch (e) {
        console.error("error", e.message);
    }
}

console.log("This is NodeJS!!");
console.log("CRND library: " + path_to_lib);
help();