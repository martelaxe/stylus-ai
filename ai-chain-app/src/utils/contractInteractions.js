import { ethers } from 'ethers';
import aiModelAbi from '../abi/aiModelAbi.json';

const contractAddress = '0xe2b11d2BC3a7Cb1F7249933D6569a08069c0BD74';

// Initialize MetaMask provider
const initializeProvider = () => {
    if (typeof window.ethereum !== 'undefined') {
        return new ethers.providers.Web3Provider(window.ethereum);
    } else {
        alert("MetaMask is not installed. Please install MetaMask to interact with this application.");
        return null;
    }
};

const provider = initializeProvider();

// Define the functions outside the if block
export const getModelState = async () => {
    if (!provider) {
        console.error("Provider is not initialized.");
        return "Provider is not initialized";
    }
    try {
        // Request the user's account from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const userAddress = accounts[0]; // Take the first account as the user's address
        const contract = new ethers.Contract(contractAddress, aiModelAbi, provider);

        // Call the contract's getModelState function with the user's address
        const state = await contract.getModelState(userAddress);
        return state.toString();
    } catch (error) {
        console.error("Failed to get the model state:", error);
        return "Error fetching state";
    }
};

export const updateModelState = async (newState) => {
    if (!provider) {
        console.error("Provider is not initialized.");
        return "Provider is not initialized";
    }
    try {
        await provider.send("eth_requestAccounts", []); // Request access to MetaMask
        const signer = provider.getSigner(); // Get the signer from MetaMask
        const contract = new ethers.Contract(contractAddress, aiModelAbi, provider);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.updateModelState(ethers.BigNumber.from(newState));
        await tx.wait();
        return 'Model state updated successfully';
    } catch (error) {
        console.error("Failed to update the model state:", error);
        return 'Update failed';
    }
};

// Optional: Check network at the initialization level or during specific function calls
if (provider) {
    provider.getNetwork().then(network => {
        if (network.chainId !== 23011913) { // Arbitrum Stylus network chainId
            alert("Please connect to the Arbitrum Stylus network.");
        }
    }).catch(error => {
        console.error("Failed to get network:", error);
    });
}
