extern crate alloc;

use alloc::string::String;
use core::marker::PhantomData;
use stylus_sdk::{
    alloy_primitives::{Address, U256},
    alloy_sol_types::sol,
    evm, msg,
    prelude::*,
};

pub trait AIModelParams {
    const MODEL_NAME: &'static str;
    const SYMBOL: &'static str;
}

sol_storage! {
    pub struct AIModel<T> {
        mapping(address => uint256) states;
        uint256 total_computations;
        PhantomData<T> phantom;
    }
}

sol! {
    event StateUpdated(address indexed from, uint256 state);

    error UnauthorizedAccess(address caller);
    error InvalidModelState(uint256 current_state);
}

#[derive(SolidityError)]
pub enum AIModelError {
    UnauthorizedAccess(UnauthorizedAccess),
    InvalidModelState(InvalidModelState),
}

impl<T: AIModelParams> AIModel<T> {
    pub fn update_state(&mut self, new_state: U256) {
        let caller = msg::sender();
        self.states.setter(caller).set(new_state);
        // Correctly handle the addition of U256
        let one = U256::from(1u64); // Assuming U256::from exists, adjust based on actual API
        self.total_computations.set(self.total_computations.get() + one);
        evm::log(StateUpdated { from: caller, state: new_state });
    }

    pub fn get_state(&self, owner: Address) -> U256 {
        self.states.get(owner)
    }
}

#[external]
impl<T: AIModelParams> AIModel<T> {
    pub fn model_name() -> String {
        T::MODEL_NAME.into()
    }

    pub fn symbol() -> String {
        T::SYMBOL.into()
    }

    pub fn total_computations(&self) -> U256 {
        self.total_computations.get()
    }
}
