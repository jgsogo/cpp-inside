
#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

//include!("bindings.rs");
extern crate libloading;


type callback_t = ::std::option::Option< unsafe extern "C" fn (state: *mut ::std::os::raw::c_void,
                                                               data: *const ::std::os::raw::c_void,
                                                               status: *const ::std::os::raw::c_void)>;

/* From bindings.rs
pub type callback_t = ::std::option::Option< unsafe extern "C" fn (state: *mut ::std::os::raw::c_void,
                                                                   data: *const ::std::os::raw::c_void,
                                                                   status: *const ::std::os::raw::c_void)>;

extern "C" {
    pub fn help(state: *mut ::std::os::raw::c_void, help_callback: callback_t);
}

*/


pub mod protos;

use protobuf::*;
use protos::help::Help;
use std::mem;
use libloading::{Library, Symbol};


extern "C" fn help_handler(state: *mut ::std::os::raw::c_void,
                           data: *const ::std::os::raw::c_void,
                           status: *const ::std::os::raw::c_void) {
    let closure: &mut &mut FnMut(*const ::std::os::raw::c_void, *const ::std::os::raw::c_void) = unsafe { mem::transmute(state) };
    closure(data as *const ::std::os::raw::c_void, status as *const ::std::os::raw::c_void)
}

pub fn help_with_callback<F>(instance: crnd, mut callback: F)
    where F: FnMut(*const ::std::os::raw::c_void, *const ::std::os::raw::c_void)
{
    // reason for double indirection is described below
    let mut cb: &mut FnMut(*const ::std::os::raw::c_void, *const ::std::os::raw::c_void) = &mut callback;
    let cb = &mut cb;

    type HelpFunc = fn(*mut ::std::os::raw::c_void, callback_t);
    let func: Symbol<HelpFunc> = unsafe {instance.lib.get(b"help").unwrap()};

    unsafe { func(cb as *mut _ as *mut ::std::os::raw::c_void, Some(help_handler)) }
}


pub struct crnd {
    pub lib: Library
}

impl crnd {
    pub fn hello() -> String {
        "Hello!".to_string()
    }

    pub fn help(self) -> String {
        type HelpFunc = fn(*mut ::std::os::raw::c_void, *const ::std::os::raw::c_void, *const ::std::os::raw::c_void);
        let func: Symbol<HelpFunc> = unsafe {self.lib.get(b"help").unwrap()};

        let mut help_message = Help::new();

        // Use a callback with closure to populate help_message
        help_with_callback(self, |data, status| {
            help_message.set_name("inner".to_string());
        });

        //help_message.set_name("name".to_string());

        let mut contents = String::new();
        help_message.write_to_writer(unsafe {contents.as_mut_vec()});
        contents
    }
}
