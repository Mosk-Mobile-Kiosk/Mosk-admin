import React from "react"
import { Box, Button, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
// import { CheckBox } from "@mui/icons-material"

function StoreRegisterForm() {
  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          가게 정보 등록
        </Typography>

        <TextField
          name="storenumber"
          label="사업자 등록 번호"
          type="text"
          required
          fullWidth
          //   autoComplete="current-password"
          margin="dense"
        />
        <TextField name="name" label="창업자명" required fullWidth margin="normal" autoFocus />

        <TextField
          name="date"
          label="창업일(ex:20230430)"
          type="text"
          required
          fullWidth
          //   autoComplete="current-password"
          margin="normal"
        />

        <Button type="button" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} style={{ height: "50px" }}>
          사업자 정보 인증
        </Button>
        <Button type="button" fullWidth variant="contained" sx={{ mb: 2 }} style={{ height: "50px" }}>
          가입 완료!
        </Button>
      </Box>
    </Container>
  )
}

export default StoreRegisterForm
