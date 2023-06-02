import React from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
  const useNav = useNavigate()

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5" mb={1}>
          회원 정보 등록
        </Typography>
        <Grid container>
          <Grid item xs={10}>
            <TextField name="email" label="이메일" required fullWidth autoComplete="email" margin="normal" autoFocus />
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2, ml: 1 }} style={{ height: "55px" }}>
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
        <TextField name="call" label="휴대폰 번호" type="text" required fullWidth margin="normal" />

        <hr style={{ width: "100%", margin: "30px 0", border: "dashed", borderWidth: ".1px", color: "grey" }} />
        <Typography component="h1" variant="h5" mb={1}>
          가게 정보 등록
        </Typography>

        <TextField name="storeName" label="가게명" type="text" required fullWidth margin="normal" />
        <TextField name="ownerName" label="사업주명" type="text" required fullWidth margin="normal" />
        <TextField name="address" label="주소" type="text" required fullWidth margin="normal" />
        <TextField name="crn" label="사업자등록번호" type="text" required fullWidth margin="normal" />

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
