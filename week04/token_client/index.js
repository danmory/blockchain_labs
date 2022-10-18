import { init, getAcc, getTokenContract, setTokenData } from "./utils";
import "./handlers";

async function main() {
  await init();

  const { signer, provider } = getAcc();

  const address = await signer.getAddress();

  console.log("address:", address);

  const balance = await provider.getBalance(address);

  console.log("balance:", balance.toString());

  const tokens = await getTokenContract().balanceOf(address);

  console.log("tokens:", tokens.toString());

  await setTokenData();
}

main();
