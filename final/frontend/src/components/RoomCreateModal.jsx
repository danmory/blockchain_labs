import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export const RoomCreateModal = ({ open, handleClose, web3Data, onRoomsUpdate }) => {
  const [roomID, setRoomID] = useState("");
  const [address, setAddress] = useState("");
  const [bet, setBet] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const create = async () => {
    setButtonsDisabled(true);
    const tx = await web3Data.diceContract.enter(roomID, address, bet);
    await tx.wait();
    console.log("Room created");
    setButtonsDisabled(false);
    await onRoomsUpdate();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Room</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter Room data. Make sure you allowed to transfer your ERC20 tokens
          before.
        </DialogContentText>
        <TextField
          margin="dense"
          id="id"
          label="Room ID"
          type="number"
          fullWidth
          variant="standard"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <TextField
          margin="dense"
          id="address"
          label="Token Address"
          type="text"
          fullWidth
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="dense"
          id="address"
          label="Bet"
          type="number"
          fullWidth
          variant="standard"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={buttonsDisabled} onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={buttonsDisabled} onClick={create}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
