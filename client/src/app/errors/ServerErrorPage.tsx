import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerErrorPage() {
  const { state } = useLocation();
  console.log(state);
  return (
    <Container>
      <Paper>
        {state.error ? (
          <>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ px: 4, pt: 2 }}
              color="secondary"
            >
              {state.error.title}
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ p: 4 }}>
              {state.error.detail}
            </Typography>
          </>
        ) : (
          <Typography variant="h5" gutterBottom>
            Server error
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
