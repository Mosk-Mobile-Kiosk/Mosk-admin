import React, { useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleDuplicateCheck = async () => {
    const emailInput = document.getElementsByName("email")[0]
    const email = emailInput.value.trim()

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      alert("이메일을 입력해주세요.")
      emailInput.focus()
      return
    } else if (!emailRegex.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.")
      emailInput.focus()
      return
    }

    try {
      const response = await fetch(`http://localhost:9090/api/v1/public/stores/email-check/${email}`, {
        method: "GET",
      })

      const data = await response.json()

      // 응답 코드에 따라 처리
      if (response.ok) {
        // 중복되지 않은 이메일인 경우
        console.log("사용 가능한 이메일입니다.")
      } else {
        // 중복된 이메일인 경우
        console.log("이미 사용 중인 이메일입니다.")
      }
    } catch (error) {
      console.error("오류 발생:", error)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5" mb={1}>
          회원 정보 등록
        </Typography>
        <Grid container>
          <Grid item xs={10}>
            <TextField
              name="email"
              type="text"
              label="이메일"
              required
              fullWidth
              autoComplete="email"
              margin="normal"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2, ml: 1 }}
              style={{ height: "55px" }}
              onClick={handleDuplicateCheck}
            >
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
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          name="confirmPassword"
          label="비밀번호확인"
          type="password"
          required
          fullWidth
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          // autoComplete="current-password"
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
