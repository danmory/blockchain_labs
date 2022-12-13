import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RunningGame } from "./RunningGame";

const statuses = {
  1: "Pending",
  2: "Ready",
  3: "Finished",
};

export const Room = ({ room, web3Data, onRoomsUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const [res1, setRes1] = React.useState(0);
  const [res2, setRes2] = React.useState(0);
  const [stop, setStop] = React.useState(false);
  const [winner, setWinner] = React.useState("");
  const start = async () => {
    const tx = await web3Data.diceContract.runGame(room.id, {
      gasLimit: 75000,
    });
    setOpen(true);
    const receipt = await tx.wait();
    const res = receipt.events.find(
      (e) => e.event === "GamePlayed" && e.args.roomID.toNumber() === room.id
    ).args;
    console.log("Game Played");
    setRes1(res.dice1.toNumber());
    setRes2(res.dice2.toNumber());
    setWinner(res.winner);
    setStop(true);
  };
  const join = async () => {
    const tx = await web3Data.diceContract.enter(
      room.id,
      room.token,
      room.prize
    );
    await tx.wait();
    console.log("Joined room");
    await onRoomsUpdate();
  };
  return (
    <Box sx={{ width: 275, margin: "0 20px 0 0" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Room: #{room.id}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ overflowWrap: "break-word" }}
            gutterBottom
          >
            Token: {room.token}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Prize: {room.prize}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Status: {statuses[room.status]}
          </Typography>
        </CardContent>
        <CardActions>
          {room.status === 2 ? (
            <Button size="small" onClick={start}>
              Start Game
            </Button>
          ) : (
            <Button size="small" onClick={join}>
              Join Room
            </Button>
          )}
        </CardActions>
      </Card>
      <RunningGame
        open={open}
        handleClose={async () => {
          setOpen(false);
          await onRoomsUpdate();
        }}
        stop={stop}
        res1={res1}
        res2={res2}
        winner={winner}
      />
    </Box>
  );
};
