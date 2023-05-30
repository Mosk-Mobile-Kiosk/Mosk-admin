import React from "react"
import RegisterForm from "../../../components/user/register/index"
import * as S from "./style"
import Logo from "../../../components/common/logo"
import { Container } from "@mui/material"

function RegisterPage() {
  return (
    <Container>
      <Logo size={80} />
      <RegisterForm />
    </Container>
  )
}

export default RegisterPage
