import { ethers } from "ethers";
import calculatorABI from "./abi/Calculator.json";

const calculatorContractAddress = "0x741ee905c52f4eFCC104aEcDDa3b27b0E0A2BCAd";

let signer;

let provider;

let calculatorContract;

export async function init() {
  provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  signer = provider.getSigner();

  calculatorContract = new ethers.Contract(calculatorContractAddress, calculatorABI, provider);
}

export function getAcc() {
  return { provider, signer };
}

export function getCalculatorContract(){
    return calculatorContract;
}