
const crnd = require('/Users/jgsogo/dev/projects/cpp-inside/bindings/js/crnd.js');


function getArgument(argument){
    var index = process.argv.indexOf(argument);
    return (index === -1) ? null : process.argv[index + 1];
}

var path_to_lib = getArgument('--crnd');

console.log("This is NodeJS!!");
console.log("CRND library: " + path_to_lib);
crnd.help(path_to_lib);

let samples = crnd.lognormal(path_to_lib, 1234, 10, 3, 0.2);
console.log(samples.getSamplesList());

console.log("DONE!!!");