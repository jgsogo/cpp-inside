extern crate crnd;
extern crate libloading;

use std::env;
use libloading::{Library, Symbol};

fn main() {
    let library_path = env::args().nth(1).expect("USAGE: loading <LIB>");

    let instance = crnd::crnd{
        lib: Library::new(library_path).unwrap()
    };
    //instance.lib = Library::new(library_path).unwrap();

    println!("This is RUST!");
    let help_msg = instance.help();
    println!("help: {:#?}", help_msg);

    let lognormal = instance.lognormal(1.0, 2, 3.0, 4.0);

}
