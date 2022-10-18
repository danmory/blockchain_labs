import { ethers } from "ethers";
import lotteryABI from "./abi/Lottery.json";

const lotteryContractAddress = "0xa91Be45569e9534BAe9e781d243B92aa1E503aFe";

let signer;

let provider;

let lotteryContract;

export async function init() {
  provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  signer = provider.getSigner();

  lotteryContract = new ethers.Contract(
    lotteryContractAddress,
    lotteryABI,
    signer
  );
}

export function getAcc() {
  return { provider, signer };
}

export function getLotteryContract() {
  return lotteryContract;
}

window.ethereum.on("accountsChanged", async () => {
  window.location.reload();
});
