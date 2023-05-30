import React from "react"
import { Box, Button, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
// import { CheckBox } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

function RegisterForm() {
  const useNav = useNavigate()
  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          사용자 정보 등록
        </Typography>
        <Grid container>
          <Grid item xs={10}>
            <TextField name="email" label="이메일" required fullWidth autoComplete="email" margin="normal" autoFocus />
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }} style={{ height: "55px" }}>
              중복확인
            </Button>
          </Grid>
        </Grid>
        <TextField
          name="password"
          label="비밀번호"
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          margin="dense"
        />
        <TextField
          name="password"
          label="비밀번호확인"
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          margin="normal"
        />

        <Button type="button" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} style={{ height: "50px" }}>
          <Link to="/register/store" style={{ color: "white" }}>
            다음단계 (가게 정보 등록)
          </Link>
        </Button>
      </Box>
    </Container>
  )
}

export default RegisterForm
