import { init, getAcc, getLotteryContract } from "./utils";
import "./handlers";

async function disableButtons() {
  const btn = document.querySelector("#pick-winner");
  const manager = await getLotteryContract().manager();
  if ((await getAcc().signer.getAddress()) !== manager) {
    btn.disabled = true;
  }
}

async function main() {
  await init();

  const { signer, provider } = getAcc();

  const address = await signer.getAddress();

  console.log("address:", address);

  const balance = await provider.getBalance(address);

  console.log("balance:", balance.toString());

  await disableButtons();
}

main();
