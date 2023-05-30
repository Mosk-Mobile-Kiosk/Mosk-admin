import React from "react"
import Header from "../../common/header/Header"
import { Box } from "@mui/material"

const DashBoard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  )
}

export default DashBoard
