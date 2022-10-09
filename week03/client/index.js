import { init, getAcc } from "./utils";
import './handlers'

async function main() {
  await init();

  const { signer, provider } = getAcc();

  const address = await signer.getAddress();

  console.log("address:", address);

  const balance = await provider.getBalance(address);

  console.log("balance:", balance.toString());
}

main();
