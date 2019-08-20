extern crate crnd;

fn main() {
    println!("Hello World!");
    println!("from the library: {}", crnd::crnd::hello());
    println!("from the library | help: {}", crnd::crnd::help());
}
