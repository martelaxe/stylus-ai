import { ethers } from 'ethers';
import aiModelAbi from '../abi/aiModelAbi.json';

const contractAddress = '0xe2b11d2BC3a7Cb1F7249933D6569a08069c0BD74';

// Use MetaMask's provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Connect to the contract
const contract = new ethers.Contract(contractAddress, aiModelAbi, provider);

export const getModelState = async () => {
    try {
        // Request the user's account from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const userAddress = accounts[0]; // Take the first account as the user's address

        // Call the contract's getModelState function with the user's address
        const state = await contract.getModelState(userAddress);
        return state.toString();
    } catch (error) {
        console.error("Failed to get the model state:", error);
        return "Error fetching state";
    }
};


export const updateModelState = async (newState) => {
    try {
        await provider.send("eth_requestAccounts", []); // Request access to MetaMask
        const signer = provider.getSigner(); // Get the signer from MetaMask
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.updateModelState(ethers.BigNumber.from(newState));
        await tx.wait();
        return 'Model state updated successfully';
    } catch (error) {
        console.error("Failed to update the model state:", error);
        return 'Update failed';
    }
};
