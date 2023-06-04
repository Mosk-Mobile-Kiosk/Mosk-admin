import React, { useState } from "react"

import { Box, Button, Container, FormControlLabel, TextField, Typography } from "@mui/material"
// import { CheckBox } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"

function LoginForm() {
  const nav = useNavigate()
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value)
  }

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value)
  }

  const login = () => {
    const email = document.getElementsByName("email")[0].value
    const password = document.getElementsByName("password")[0].value

    const loginRequestBody = {
      email: email,
      password: password,
    }

    try {
      const response = fetch("http://localhost:9090/api/v1/public/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequestBody),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((data) => {
          sessionStorage.setItem("accessToken", data.data.accessToken)
          nav("home")
        })
    } catch (error) {
      console.error("오류 발생:", error)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          name="email"
          label="이메일"
          required
          fullWidth
          autoComplete="email"
          margin="normal"
          autoFocus
          onChange={handleLoginEmailChange}
        />
        <TextField
          name="password"
          label="비밀번호"
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          margin="normal"
          onChange={handleLoginPasswordChange}
        />
        {/* <FormControlLabel control={<CheckBox value="remember" color="primary" />} label="Remember me" /> */}
        <Button
          onClick={login}
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
