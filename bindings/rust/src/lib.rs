
#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

include!("bindings.rs");

//use protobuf::*;
//use protos::help::Help;

// Wrapper
/*
fn rust_function<F: Fn(*const ::std::os::raw::c_void, *const ::std::os::raw::c_void)>(callback: F) {
    let callback: Box<dyn Fn(*const ::std::os::raw::c_void, *const ::std::os::raw::c_void)> = Box::new(callback);

    extern "C" fn callback_wrapper(state: *mut ::std::os::raw::c_void,
                                   data: *const ::std::os::raw::c_void,
                                   status: *const ::std::os::raw::c_void) {
        let f = state as *const Box<dyn Fn(*const ::std::os::raw::c_void, *const ::std::os::raw::c_void)>;
        unsafe { f.as_ref().unwrap()(data); f.as_ref().unwrap()(status);  }
    }
    help(callback_wrapper, &callback as *const _ as *const ::std::os::raw::c_void);
}
*/

pub mod protos;

use protobuf::*;
use protos::help::Help;

pub struct crnd {
}

impl crnd {
    pub fn hello() -> String {
        "Hello!".to_string()
    }

    pub fn help() -> String {
        let mut help_message = Help::new();
        help_message.set_name("name".to_string());

        let f = || {};

        let mut contents = String::new();
        help_message.write_to_writer(unsafe {contents.as_mut_vec()});
        contents
    }
}

/*
pub type callback_t = ::std::option::Option<unsafe extern "C" fn (state: *mut ::std::os::raw::c_void,
                                                                  data: *const ::std::os::raw::c_void,
                                                                  status: *const ::std::os::raw::c_void)>;
*/