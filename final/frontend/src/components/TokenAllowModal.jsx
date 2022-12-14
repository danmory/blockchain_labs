import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as ethers from "ethers";
import IERC20tokenABI from "../abi/IERC20.json";

export const TokenAllowModal = ({ open, handleClose, web3Data }) => {
  const [address, setAddress] = useState("");
  const [bet, setBet] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const deposit = async () => {
    setButtonsDisabled(true);
    const ERC20TokenContract = new ethers.Contract(
      address,
      IERC20tokenABI,
      web3Data.signer
    );
    const tx = await ERC20TokenContract.approve(
      web3Data.diceContract.address,
      bet
    );
    await tx.wait();
    console.log("ERC20 Token approved");
    const allowance = await ERC20TokenContract.allowance(
      await web3Data.signer.getAddress(),
      web3Data.diceContract.address
    );
    setButtonsDisabled(false);
    console.log("ERC20 Token allowance:", allowance.toString());
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Deposit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter ERC20 Token data. It will allow the Dice contract to bet your
          tokens.
        </DialogContentText>
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
        <Button disabled={buttonsDisabled} onClick={deposit}>
          Deposit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
