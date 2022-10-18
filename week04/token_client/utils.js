import { ethers } from "ethers";
import tokenABI from "./abi/DanilaERC20.json";

const tokenContractAddress = "0x4368D927942F73a497C135a079F33678CFbe8297";

let signer;

let provider;

let tokenContract;

export async function init() {
  provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  signer = provider.getSigner();

  tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
}

export function getAcc() {
  return { provider, signer };
}

export function getTokenContract() {
  return tokenContract;
}

window.ethereum.on("accountsChanged", async () => {
  window.location.reload();
});

export async function setTokenData() {
  const tokenName = await getTokenContract().name();
  const tokenSymbol = await getTokenContract().symbol();
  const tokenSupply = await getTokenContract().totalSupply();
  const myBalance = await getTokenContract().balanceOf(
    getAcc().signer.getAddress()
  );
  document.querySelector("#token-name").textContent += tokenName;
  document.querySelector("#token-symbol").textContent += tokenSymbol;
  document.querySelector("#token-supply").textContent +=
    (tokenSupply / 10 ** 18).toString() + " DANILA";
  document.querySelector("#my-balance").textContent =
    (myBalance / 10 ** 18).toString() + " DANILA";
}
