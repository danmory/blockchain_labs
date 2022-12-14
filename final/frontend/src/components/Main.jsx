import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { RoomPanel } from "./RoomPanel.jsx";
import * as ethers from "ethers";
import { config } from "../config";
import diceABI from "../abi/Dice.json";
import { TokenAllowModal } from "./TokenAllowModal.jsx";
import { RoomCreateModal } from "./RoomCreateModal.jsx";

const Container = styled.div`
  margin: 0 auto;
`;

const ActionButtons = styled.div`
  margin: 10px 0 20px 0;
`;

export const Main = () => {
  const [rooms, setRooms] = useState([]);
  const [tokenAllowModalOpen, setTokenAllowModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [web3Data, setWeb3Data] = useState({
    provider: null,
    signer: null,
    diceContract: null,
  });

  const getRooms = async (diceContract) => {
    const rooms = await diceContract.getRooms();
    setRooms(
      rooms
        .map((room) => ({
          id: room.id.toNumber(),
          token: room.token,
          prize: room.prize.toNumber(),
          status: room.status.toNumber(),
        }))
        .filter((room) => room.status !== 3)
    );
  };

  useEffect(() => {
    const retrieveData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("account address:", address);
      const diceContract = new ethers.Contract(
        config.diceContract,
        diceABI,
        signer
      );
      console.log("dice address:", config.diceContract);
      setWeb3Data({ provider, signer, diceContract });
      await getRooms(diceContract);
    };
    retrieveData();
  }, []);

  return (
    <Container>
      <ActionButtons>
        <Button
          onClick={() => setTokenAllowModalOpen(true)}
          sx={{ margin: "0 20px 0 0" }}
        >
          Deposit Tokens
        </Button>
        <Button
          onClick={() => setCreateModalOpen(true)}
          sx={{ margin: "0 20px 0 0" }}
        >
          Create Room
        </Button>
        <Button onClick={() => getRooms(web3Data.diceContract)}>
          Refresh Rooms
        </Button>
      </ActionButtons>
      <RoomPanel
        rooms={rooms}
        web3Data={web3Data}
        onRoomsUpdate={() => getRooms(web3Data.diceContract)}
      />
      <TokenAllowModal
        open={tokenAllowModalOpen}
        handleClose={() => setTokenAllowModalOpen(false)}
        web3Data={web3Data}
      />
      <RoomCreateModal
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        web3Data={web3Data}
        onRoomsUpdate={() => getRooms(web3Data.diceContract)}
      />
    </Container>
  );
};
