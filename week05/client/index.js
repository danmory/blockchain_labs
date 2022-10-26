import { init, getAcc, getLogoContract } from "./utils";

async function draw() {
  const logo = document.querySelector("#logo");
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.classList.add("logo-elem");
    const logoContract = getLogoContract();
    div.addEventListener("click", async () => {
      const exists = await logoContract.exists(i);
      if (!exists) {
        const tx = await logoContract.mint(
          i,
          prompt("Enter item title"),
          prompt("Enter item image url")
        );
        await tx.wait();
        console.log("Minted!");
      } else {
        const [title, image] = await logoContract.getTokenInfo(i);
        alert(`Title: ${title}, Image: ${image}`);
      }
      window.location.reload();
    });
    const [title, image] = await logoContract.getTokenInfo(i);
    div.style.backgroundImage = `url(${image})`;
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

  await draw();
}

main();
