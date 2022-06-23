import React from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "lightBlue",
          padding: "55px",
          borderRadius: "20px",
          maxWidth: "450px",
          margin: "12rem auto 0 auto"
        }}
      >
        <h2>Login</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container alignItems="center" justify="center" direction="column" spacing={3}>
            <Grid item>
              <TextField label="Email" type="email" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField label="Password" type="password" variant="outlined" />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Login;
