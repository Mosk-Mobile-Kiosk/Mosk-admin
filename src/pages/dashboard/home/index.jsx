import React from "react"
import { ColorModeContext, useMode } from "../../../../theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import Topbar from "../../../components/common/topbar"
// import Sidebar from "../../../components/common/sidebar"
import { Outlet } from "react-router-dom"

function Home() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Home
