
const crnd = require('../../bindings/js/crnd.js');


function getArgument(argument){
    var index = process.argv.indexOf(argument);
    return (index === -1) ? null : process.argv[index + 1];
}

var path_to_lib = getArgument('--crnd');

console.log("This is NodeJS!!");
console.log("CRND library: " + path_to_lib);

// Call for help
//let help = crnd.help(path_to_lib);
//console.log("name: ", help.getName());
//console.log("description: ", help.getDescription());
//console.log("version: ", help.getVersion());

// Call for samples
let samples = crnd.lognormal(path_to_lib, 12345, 100000, 3, 0.2);

function draw_histogram(rolls, title) {
    let nstars = 300;
    let nclasses = 20;

    var p = [].fill.call({ length: nclasses+1 }, 0);
    var max = Math.max.apply(null, rolls);
    var min = Math.min.apply(null, rolls);
    var step = (max-min)/nclasses;
    rolls.forEach(function (elem, index) {
        idx = Math.round((elem-min)/step);
        p[idx] += 1;
    });

    console.log(title);
    for (var i = 0; i < nclasses; i++) {
        var axis_x = (min+i*step+step/2).toFixed(6).padStart(9, "0");
        var npstars = Math.round(p[i]*nstars/rolls.length);

        console.log(axis_x + ": " + "*".repeat(npstars));
    }
}

draw_histogram(samples.getSamplesList(), "lognormal(3, 0.2)");
