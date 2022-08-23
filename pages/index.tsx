import { Delete, Warning } from "@mui/icons-material";
import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useTasks } from "./useTasks";
import * as types from "./types";

import {
  Paper,
  Alert,
  TextField,
  Dialog,
  Typography,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";

const List = styled.div`
  padding: 1rem;
  min-height: 100vh;
`;

const Card = styled(Paper)`
  margin: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  background: #eee;
  min-height: 100vh;
  padding: 1rem;
`;

const InnerDialog = styled.div`
  padding: 1rem;
`;

const Buttons = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
  padding: 0.5rem;
`;

const StyledAlert = styled(Alert)`
  margin-top: 1rem;
`;

export const Home: NextPage<types.props> = () => {
  const {
    alert,
    handleAdd,
    handleChange,
    handleDelete,
    handleToggle,
    name,
    phase,
    tasks,
    handleToResting,
    deleting,
    setPhase,
    setDeleting,
  } = useTasks();

  return (
    <Wrapper>
      {deleting && (
        <Dialog onClose={handleToResting} open>
          <InnerDialog>
            <Typography>Are you sure you want to delete</Typography>

            <Buttons>
              <Button onClick={handleToResting} variant="outlined">
                Cancel
              </Button>
              <Button variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </Buttons>
          </InnerDialog>
        </Dialog>
      )}

      {phase === "adding" && (
        <Dialog onClose={handleToResting} open>
          <InnerDialog>
            <TextField onChange={handleChange} value={name} label="Name" />

            {alert && (
              <StyledAlert severity="warning" icon={<Warning />}>
                {alert}
              </StyledAlert>
            )}

            <Buttons>
              <Button onClick={handleToResting} variant="outlined">
                Cancel
              </Button>
              <Button variant="contained" onClick={handleAdd}>
                Add
              </Button>
            </Buttons>
          </InnerDialog>
        </Dialog>
      )}

      {tasks.length < 1 && (
        <Typography>There are not tasks. Please add one.</Typography>
      )}

      {tasks.length >= 1 && (
        <List>
          {tasks.map(({ id, title, completed }) => (
            <Card key={id}>
              <IconButton>
                <Checkbox
                  checked={completed}
                  onChange={() => handleToggle(id)}
                />
              </IconButton>

              <Typography>{title}</Typography>

              <IconButton onClick={() => setDeleting(id)}>
                <Delete />
              </IconButton>
            </Card>
          ))}
        </List>
      )}

      <ButtonWrapper elevation={6}>
        <Button variant="contained" onClick={() => setPhase("adding")}>
          Add Task
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Home;
