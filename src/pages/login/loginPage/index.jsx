import React from "react"
import LoginForm from "../../../components/user/login"
import * as S from "./style"
import Logo from "../../../components/common/logo"
import { Container } from "@mui/material"

function LoginPage() {
  return (
    <Container>
      <Logo size={100} />
      <LoginForm />
    </Container>
  )
}

export default LoginPage
