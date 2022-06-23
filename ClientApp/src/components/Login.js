import React from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Link from './Link';

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
          padding: "55px 75px",
          borderRadius: "20px",
          maxWidth: "550px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container alignItems="center" justify="center" direction="column" spacing={3}>
            <Grid item>
              <h2>Login</h2>
            </Grid>
            <Grid item>
              <TextField label="Email" type="email" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField label="Password" type="password" variant="outlined" />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
            <Grid item>
              <p>New here? <Link to="/home">Create an account</Link> </p>
              <p>Or try out a <Link to="/home">Demo Account</Link></p>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Login;
