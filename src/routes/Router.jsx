import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/login/loginPage"
import Home from "../pages/dashboard/home"
import Team from "../components/dashContent/team"
import Inovices from "../components/dashContent/invoices"
import DashBoard from "../components/dashContent/dashboard"
import RegisterPage from "../pages/login/registerPage"
import StorePage from "../pages/login/storeRegisterPage"
import Contacts from "../components/dashContent/contacts"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/storeRegister" element={<StorePage />} />
      <Route path=":home/" element={<Home />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="team" element={<Team />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="invoices" element={<Inovices />} />
      </Route>
    </Routes>
  )
}

export default Router
