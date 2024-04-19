#![cfg_attr(not(feature = "export-abi"), no_main, no_std)]
extern crate alloc;

use alloc::{vec::Vec, string::String};
use stylus_sdk::{alloy_primitives::U256, call, msg, prelude::*};
use alloy_primitives::Address;  // Import Address

#[cfg(target_arch = "wasm32")]
#[global_allocator]
static ALLOC: mini_alloc::MiniAlloc = mini_alloc::MiniAlloc::INIT;

mod ai;

struct BasicAIParams;

/// Immutable definitions for the AI model
impl ai::AIModelParams for BasicAIParams {
    const MODEL_NAME: &'static str = "Basic AI Model";
    const SYMBOL: &'static str = "BASIC-AI";
}

// The main contract entrypoint
sol_storage! {
    #[entrypoint]
    struct Main {
        #[borrow]
        ai::AIModel<BasicAIParams> model;
    }
}

#[external]
#[inherit(ai::AIModel<BasicAIParams>)]
impl Main {
    pub fn update_model_state(&mut self, new_state: U256) {
        self.model.update_state(new_state);
    }

    pub fn get_model_state(&self, owner: Address) -> U256 {
        self.model.get_state(owner)
    }

    pub fn get_total_computations(&self) -> U256 {
        self.model.total_computations()
    }
}
