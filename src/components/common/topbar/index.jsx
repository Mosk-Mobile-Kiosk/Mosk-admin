import React, { useState } from "react"
import { Box, IconButton, useTheme, Modal } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext, tokens } from "../../../../theme"
import InputBase from "@mui/material/InputBase"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import QrCode2Icon from "@mui/icons-material/QrCode2"
import QrCode from "../qrcode"

const Topbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

  const [isQrCodeModalOpen, setQrCodeModalOpen] = useState(false)

  const handleQrCodeButtonClick = () => {
    setQrCodeModalOpen(true)
  }

  const handleQrCodeModalClose = () => {
    setQrCodeModalOpen(false)
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search Box */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleQrCodeButtonClick}>
          <QrCode2Icon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>

      {/* QR Code Modal */}
      <Modal open={isQrCodeModalOpen} onClose={handleQrCodeModalClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <QrCode />
        </Box>
      </Modal>
    </Box>
  )
}

export default Topbar
