import { getTokenContract, setTokenData } from "./utils";

document.querySelector("#transfer-btn").addEventListener("click", async () => {
  const to = document.querySelector("#transfer-to").value;
  const amount =
    BigInt(document.querySelector("#transfer-amount").value) * BigInt(10 ** 18);
  await getTokenContract().transfer(to, amount);
});

document.querySelector("#approve-btn").addEventListener("click", async () => {
  const spender = document.querySelector("#approve-to").value;
  const amount =
    BigInt(document.querySelector("#approve-amount").value) * BigInt(10 ** 18);
  await getTokenContract().approve(spender, amount);
});

document
  .querySelector("#transfer-from-btn")
  .addEventListener("click", async () => {
    const from = document.querySelector("#transfer-from").value;
    const to = document.querySelector("#transfer-from-to").value;
    const amount =
      BigInt(document.querySelector("#transfer-from-amount").value) *
      BigInt(10 ** 18);
    await getTokenContract().transferFrom(from, to, amount);
  });

document.querySelector("#balances-btn").addEventListener("click", async () => {
  const holders = await getTokenContract().getHolders();
  const balances = document.querySelector("#balances");
  balances.innerHTML = "";
  for (let h of holders) {
    const balance = await getTokenContract().balanceOf(h);
    balances.innerHTML += `<li>${h}: ${balance / 10 ** 18} DANILA</li>`;
  }
  await setTokenData();
});
