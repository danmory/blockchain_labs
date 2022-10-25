import { init, getAcc, getLogoContract } from "./utils";

function draw() {
  const logo = document.querySelector("#logo");
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.classList.add("logo-elem");
    div.addEventListener("click", async (e) => {
      const logoContract = getLogoContract();
      const tx = await logoContract.mint(
        i,
        prompt("Enter item title"),
        prompt("Enter item image url")
      );
      await tx.wait();
      console.log("Minted!");
    });
    logo.appendChild(div);
  }
}

async function main() {
  await init();

  const { signer, provider } = getAcc();

  const address = await signer.getAddress();

  console.log("address:", address);

  const balance = await provider.getBalance(address);

  console.log("balance:", balance.toString());

  draw();
}

main();
