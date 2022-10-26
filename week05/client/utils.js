import { ethers } from "ethers";
import logoABI from "./abi/Logo.json";

const logoContractAddress = "";

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