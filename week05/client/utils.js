import { ethers } from "ethers";
import logoABI from "./abi/Logo.json";

const logoContractAddress = "0x741ee905c52f4eFCC104aEcDDa3b27b0E0A2BCAd";

let signer;

let provider;

let logoContract;

export async function init() {
  provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  signer = provider.getSigner();

  logoContract = new ethers.Contract(logoContractAddress, logoABI, signer);
}

export function getAcc() {
  return { provider, signer };
}

export function getLogoContract(){
    return logoContract;
}