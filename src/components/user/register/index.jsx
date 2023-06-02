import React from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
  const useNav = useNavigate()

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          회원 정보 등록
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
          autoComplete="password"
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

        <hr style={{ width: "100%", margin: "30px 0", border: "dashed", borderWidth: ".1px", color: "grey" }} />
        <Typography component="h1" variant="h5">
          가게 정보 등록
        </Typography>

        <TextField name="storenumber" label="사업자 등록 번호" type="text" required fullWidth margin="dense" />
        <TextField name="name" label="창업자명" required fullWidth margin="normal" />

        <TextField name="date" label="창업일(ex:20230430)" type="text" required fullWidth margin="normal" />

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

export default RegisterForm
