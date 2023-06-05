import React, { useEffect, useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [confirmUseEmail, setConfirmUseEmail] = useState(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [foundedDate, setFoundedDate] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [crn, setCrn] = useState("")
  const [isCertified, setIsCertified] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleConfirmUseEmail = async () => {
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
        setConfirmUseEmail(confirm("사용 가능한 이메일입니다. 사용하시겠습니까?"))
      } else {
        // 중복된 이메일인 경우
        alert("이미 사용 중인 이메일입니다.")
      }
    } catch (error) {
      console.error("오류 발생:", error)
    }
  }

  useEffect(() => {
    if (confirmUseEmail === null) {
      return
    }

    if (confirmUseEmail) {
      const emailInput = document.getElementsByName("email")[0]
      emailInput.disabled = true
    } else {
      alert("이메일 사용을 취소했습니다.")
    }
  }, [confirmUseEmail])

  const handlePhoneNumberChange = (event) => {
    // 입력된 값에서 하이픈 제거
    const formattedPhoneNumber = event.target.value.replace(/-/g, "")
    // 휴대폰 번호 업데이트
    setPhoneNumber(formattedPhoneNumber)
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)

    // 비밀번호 확인 일치 여부 체크
    if (event.target.value !== password) {
      setPasswordError("비밀번호가 일치하지 않습니다.")
    } else {
      setPasswordError("")
    }
  }

  const handleFoundedDateChange = (event) => {
    setFoundedDate(event.target.value)
  }

  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value)
  }

  const handleCrnChange = (event) => {
    setCrn(event.target.value)
  }

  const handleCertify = async () => {
    // 사업자 정보 유효성 검사
    if (!foundedDate || !ownerName || !crn) {
      alert("사업자 정보를 모두 입력해주세요.")
      return
    }

    try {
      const response = await fetch(
        `http://localhost:9090/api/v1/public/stores/business-registration?foundedDate=${foundedDate}&ownerName=${ownerName}&crn=${crn}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      const data = await response.json()

      // 응답 코드에 따라 처리
      if (response.ok) {
        setIsCertified(true)
        alert("사업자 정보 인증 성공")
      } else {
        setIsCertified(false)
        alert("사업자 정보 인증 실패")
      }
    } catch (error) {
      console.error("오류 발생:", error)
    }
  }

  const handleSubmit = async () => {
    const inputBoxs = document.querySelectorAll("input")

    for (const input of inputBoxs) {
      if (!input.value) {
        alert(`${input.name}을(를) 입력해주세요.`)
        return
      }
    }

    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
    if (!passwordRegex.test(password)) {
      setPasswordError("비밀번호는 영문, 숫자, 특수문자(@$!%*#?&)를 포함한 8~20자리여야 합니다.")
      return
    }
    // 비밀번호 확인 검사
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.")
      return
    }
    // 비밀번호 확인 일치한 경우
    setPasswordError("") // 에러 메시지 초기화

    if (!confirmUseEmail) {
      alert("이메일 중복확인을 먼저 완료해주세요.")
      return
    }
    if (!isCertified) {
      alert("사업자 정보 인증을 먼저 완료해주세요.")
      return
    }
    if (isCertified || confirmUseEmail) {
      const email = document.getElementsByName("email")[0].value
      const password = document.getElementsByName("password")[0].value
      const storeName = document.getElementsByName("storeName")[0].value
      const ownerName = document.getElementsByName("ownerName")[0].value
      const call = document.getElementsByName("call")[0].value
      const address = document.getElementsByName("address")[0].value
      const crn = document.getElementsByName("crn")[0].value

      const storeRegisterRequestBody = {
        email: email,
        password: password,
        storeName: storeName,
        ownerName: ownerName,
        call: call,
        address: address,
        crn: crn,
      }

      try {
        const response = await fetch("http://localhost:9090/api/v1/public/stores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(storeRegisterRequestBody),
        })

        const data = await response.json()

        // 응답 코드에 따라 처리
        if (response.ok) {
          setIsCertified(true)
          alert("회원가입 완료!")
        } else {
          setIsCertified(false)
          alert("회원가입 실패.")
        }
      } catch (error) {
        console.error("오류 발생:", error)
      }
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
              onClick={handleConfirmUseEmail}
            >
              중복확인
            </Button>
          </Grid>
        </Grid>

        <TextField
          name="password"
          label="비밀번호"
          placeholder="영문, 숫자, 특수문자(@$!%*#?&)를 포함한 8~20자리여야 합니다."
          type={passwordVisible ? "text" : "password"}
          required
          fullWidth
          autoComplete="password"
          margin="dense"
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirmPassword"
          label="비밀번호확인"
          type="password"
          required
          fullWidth
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          margin="normal"
          error={passwordError.length > 0} // 에러 상태인 경우 에러 표시
          helperText={passwordError} // 에러 메시지 표시
        />
        <TextField
          name="call"
          label="휴대폰 번호"
          type="text"
          required
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          inputProps={{
            maxLength: 11, // 휴대폰 번호는 11자리까지 입력 가능하도록 제한
            pattern: "[0-9]*", // 숫자만 입력 가능하도록 패턴 설정
            inputMode: "numeric", // 숫자 입력 모드 설정 (모바일에서 숫자 키패드 노출)
          }}
        />
        <TextField
          name="address"
          label="주소"
          type="text"
          required
          fullWidth
          margin="normal"
          value={address}
          onChange={handleAddressChange}
        />

        <hr style={{ width: "100%", margin: "30px 0", border: "dashed", borderWidth: ".1px", color: "grey" }} />

        <Typography component="h1" variant="h5" mb={1}>
          사업자정보 인증
        </Typography>

        <TextField
          name="storeName"
          label="창업일"
          type="text"
          required
          fullWidth
          margin="normal"
          value={foundedDate}
          onChange={handleFoundedDateChange}
        />
        <TextField
          name="ownerName"
          label="사업주명"
          type="text"
          required
          fullWidth
          margin="normal"
          value={ownerName}
          onChange={handleOwnerNameChange}
        />

        <TextField
          name="crn"
          label="사업자등록번호"
          type="text"
          required
          fullWidth
          margin="normal"
          value={crn}
          onChange={handleCrnChange}
        />

        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={handleCertify}
          sx={{ mt: 1, mb: 2 }}
          style={{ height: "50px" }}
        >
          사업자정보 인증 확인
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mb: 2 }}
          style={{ height: "50px" }}
        >
          가입 완료!
        </Button>
      </Box>
    </Container>
  )
}

export default RegisterForm
