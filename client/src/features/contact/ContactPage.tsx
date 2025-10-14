import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment, type CounterState } from "./counterReducer";

export default function ContactPage() {
  const data = useSelector((state: CounterState) => state.data);
  const dispatch = useDispatch();
  return (
    <>
      <Typography variant="h2">Contact Page</Typography>
      <Typography variant="body1">The data is: {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch(increment())}
          color="primary"
        >
          Increment
        </Button>
        <Button
          onClick={() => dispatch(decrement())}
          color="error"
        >
          Decrement
        </Button>
        <Button
          onClick={() => dispatch(increment(5))}
          color="primary"
        >
          Increment By 5
        </Button>
        <Button
          onClick={() => dispatch(decrement(5))}
          color="error"
        >
          Decrement By 5
        </Button>
      </ButtonGroup>
    </>
  );
}
