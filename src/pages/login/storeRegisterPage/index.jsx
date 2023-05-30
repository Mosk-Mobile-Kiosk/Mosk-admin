import React from "react"
import Logo from "../../../components/common/logo"
import StoreRegisterForm from "../../../components/user/storeRegister"
import { Container } from "@mui/material"

function StorePage() {
  return (
    <Container>
      <Logo size={80} />
      <StoreRegisterForm />
    </Container>
  )
}

export default StorePage
