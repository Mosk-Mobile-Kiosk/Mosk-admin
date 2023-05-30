import { useMode, ColorModeContext } from "../theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import LoginPage from "./pages/login/loginPage"
import { Route, Routes } from "react-router-dom"
import Router from "./routes/Router"

function App() {
  return <Router />
}

export default App
