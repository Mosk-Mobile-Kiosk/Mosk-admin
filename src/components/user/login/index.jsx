import React from "react"
import { Box, Button, Container, FormControlLabel, TextField, Typography } from "@mui/material"
// import { CheckBox } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"

function LoginForm() {
  const nav = useNavigate()

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField name="email" label="이메일" required fullWidth autoComplete="email" margin="normal" autoFocus />
        <TextField
          name="password"
          label="비밀번호"
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          margin="normal"
        />
        {/* <FormControlLabel control={<CheckBox value="remember" color="primary" />} label="Remember me" /> */}
        <Button
          onClick={() => {
            nav("home")
          }}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ height: "50px" }}
        >
          로그인
        </Button>
        <span>
          아직 회원이 아니신가요?<Link to="/register">회원가입</Link>
        </span>
      </Box>
    </Container>
  )
}

export default LoginForm
