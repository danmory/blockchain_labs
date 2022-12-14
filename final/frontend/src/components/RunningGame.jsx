import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import styled from "@emotion/styled";

const Diceboard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dice = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin: 0 10px;
`;

export const RunningGame = ({ open, handleClose, stop, res1, res2 }) => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const roll = () => {
    if (stop) {
      return;
    }
    setDice1(Math.floor(Math.random() * 6) + 1);
    setDice2(Math.floor(Math.random() * 6) + 1);
  };
  const interval = open && setInterval(roll, 1000);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Game</DialogTitle>
      <DialogContent>
        <Diceboard>
          <Dice>{stop ? res1 : dice1}</Dice>
          <Dice>{stop ? res2 : dice2}</Dice>
        </Diceboard>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            clearInterval(interval);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
