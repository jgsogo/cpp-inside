extern crate crnd;
extern crate libloading;

use std::env;
use libloading::Library;

fn main() {
    let library_path = env::args().nth(1).expect("USAGE: loading <LIB>");

    let instance = crnd::crnd{
        lib: Library::new(library_path).unwrap()
    };
    //instance.lib = Library::new(library_path).unwrap();

    println!("This is RUST!");
    let help_msg = instance.help();
    println!("help: {:#?}", help_msg);

    let lognormal = instance.lognormal(12345.0, 100000, 3.0, 0.2);
    draw_histogram(lognormal.samples, "lognormal(3, 0.2)".to_string());
}

fn draw_histogram(rolls: ::std::vec::Vec<f32>, title: String) {
    let nstars: u32 = 300;
    let nclasses: usize = 20;

    let mut p = vec![0; nclasses+1];
    let min = rolls.iter().cloned().fold(0./0., f32::min);
    let max = rolls.iter().cloned().fold(-0./0., f32::max);

    let step = (max-min)/(nclasses as f32);
    for elem in &rolls {
        p[((elem-min)/step) as usize] += 1;
    }

    println!("{}", title);
    for i in 0..nclasses {
        let mid_value = min+((i as f32)*step)+step/2.0;
        let n_stars: usize = (p[i]*nstars/rolls.len() as u32) as usize;
        let stars_str: String = std::iter::repeat("*").take(n_stars).collect::<String>();
        println!("{}: {}", mid_value, stars_str);
    }
}
