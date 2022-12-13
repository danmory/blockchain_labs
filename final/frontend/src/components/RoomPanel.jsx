import { Room } from "./Room.jsx";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const RoomPanel = ({ rooms, web3Data, onRoomsUpdate }) => {
  return (
    <Container>
      {rooms?.length === 0 && (
        <Typography variant="h2" sx={{ marin: "0 20px" }}>
          No rooms..
        </Typography>
      )}
      {rooms?.map((room) => (
        <Room
          key={room.id}
          room={room}
          web3Data={web3Data}
          onRoomsUpdate={onRoomsUpdate}
        />
      ))}
    </Container>
  );
};
