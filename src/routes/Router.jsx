import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/login/loginPage"
import Home from "../pages/dashboard/home"
import Team from "../components/dashContent/team"
import Inovices from "../components/dashContent/inovices"
import DashBoard from "../components/dashContent/dashboard"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path=":home/" element={<Home />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="inovices" element={<Inovices />} />
      </Route>
    </Routes>
  )
}

export default Router
