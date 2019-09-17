const ffi = require("ffi");
var ref = require('ref');
var Struct = require('ref-struct');
var status_pb = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/messages/status_pb.js');


/*
var Serialized = Struct({
    data: ref.refType(ref.types.void),
    size: ref.types.int64,
});
*/
var Serialized = Struct();
Serialized.defineProperty('data', 'string'); //ref.refType(ref.types.void));
Serialized.defineProperty('size', ref.types.int);
var SerializedPtr = ref.refType(Serialized);


function getArgument(argument){
    var index = process.argv.indexOf(argument);
    return (index === -1) ? null : process.argv[index + 1];
}

var path_to_lib = getArgument('--crnd');

function help() {
    try {
        const crnd = ffi.Library(path_to_lib, {
            help: [ref.types.void, [ref.refType(ref.types.void), ref.refType(ref.types.void)]]
        });

        // Callback from the native lib back into js
        var callback = ffi.Callback(ref.types.void, [ref.refType(ref.types.void), SerializedPtr, SerializedPtr],
            function(state, data, status_in) {
                console.log("> nodejs::callback");
                var status = status_in.deref();

                console.log("status: ", status);
                console.log("status.size: ", status.size);
                console.log("status.data: ", status.data);

                console.log("status.size: ", ref.readPointer(status));
                console.log("status.size: ", ref.readInt64BE(status));

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