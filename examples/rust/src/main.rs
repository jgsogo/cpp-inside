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

    println!("Hello World!");
    println!("from the library: {}", crnd::crnd::hello());
    println!("from the library | help: {}", instance.help());
}
