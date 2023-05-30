import React from "react"
import { Container } from "react-bootstrap"
import Logo from "../../../components/common/logo"
import StoreRegisterForm from "../../../components/user/storeRegister"

function StorePage() {
  return (
    <Container>
      <Logo size={80} />
      <StoreRegisterForm />
    </Container>
  )
}

export default StorePage
