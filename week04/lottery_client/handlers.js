import { parseEther } from "ethers/lib/utils";
import { getLotteryContract } from "./utils";

document.querySelector("#enter").addEventListener("click", async () => {
  const lotteryContract = getLotteryContract();
  const tx = await lotteryContract.enter({
    gasLimit: 500000,
    value: parseEther("0.011"),
  });
  await tx.wait();
  console.log("You entered the lottery!");
});

document.querySelector("#get-players").addEventListener("click", async () => {
  const lotteryContract = getLotteryContract();
  const players = await lotteryContract.getPlayers();
  const list = document.querySelector("#players");
  list.innerHTML = "";
  for (let p of players) {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  }
});

document.querySelector("#pick-winner").addEventListener("click", async () => {
  const lotteryContract = getLotteryContract();
  const tx = await lotteryContract.pickWinner();
  await tx.wait();
  console.log("Winner picked!");
});
