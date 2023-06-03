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
import Form from "../components/dashContent/form"
import Calendar from "../components/dashContent/calendar"
import Bar from "../components/dashContent/bar"
import Pie from "../components/dashContent/pie"
import Line from "../components/dashContent/line"
import Geo from "../components/dashContent/geo"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path=":home/" element={<Home />}>
        <Route index element={<Calendar />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="team" element={<Team />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="invoices" element={<Inovices />} />
        <Route path="form" element={<Form />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="bar" element={<Bar />} />
        <Route path="pie" element={<Pie />} />
        <Route path="line" element={<Line />} />
        <Route path="geo" element={<Geo />} />
      </Route>
    </Routes>
  )
}

export default Router
