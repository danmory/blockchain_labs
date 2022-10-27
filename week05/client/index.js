import { ethers } from "ethers";
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
        const title = prompt("Purchasing item: Enter item title");
        const image = prompt("Purchasing item: Enter item image url");
        if (title === "" || image === "") {
          alert("Empty title or image url");
          return;
        }
        const tx = await logoContract.mint(i, title, image, {
          value: ethers.utils.parseEther("0.001"),
        });
        await tx.wait();
        console.log("Minted!");
      } else {
        const [title, image] = await logoContract.getTokenInfo(i);
        alert(`Title: ${title}, Image: ${image}`);
      }
      window.location.reload();
    });
    new Promise(async (resolve) => {
      const [title, image] = await logoContract.getTokenInfo(i);
      div.style.backgroundImage = `url(${image})`;
      resolve();
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

  await draw();
}

main();
