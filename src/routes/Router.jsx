import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/login/loginPage"
import Home from "../pages/dashboard/home"
import Team from "../components/dashContent/team"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="home/*" element={<Home />}>
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  )
}

export default Router
