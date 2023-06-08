import React, { useState } from "react"
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"

const CategoryRegisterModal = ({
  openCategoryRegisterModal,
  setOpenCategoryRegisterModal,
  categories,
  setCategories,
  handleCategoryChage,
}) => {
  const [name, setName] = useState("")

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleCloseModal = () => {
    setOpenCategoryRegisterModal(false)
  }

  const submitCreateCategory = () => {
    const categoryRegisterRequestBody = {
      name: name,
    }

    fetch("http://localhost:9090/api/v1/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(categoryRegisterRequestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        console.log(data.data)
        handleCategoryChage(data.data)
        setOpenCategoryRegisterModal(false)
      })
  }

  return (
    <Dialog open={openCategoryRegisterModal} onClose={handleCloseModal} fullWidth>
      <DialogTitle>카테고리 추가</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="메뉴 이름" name="name" onChange={handleNameChange} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", margin: "0 15px" }}>
        <Button variant="contained" color="primary" onClick={handleCloseModal}>
          취소
        </Button>
        <Button variant="outlined" color="primary" onClick={submitCreateCategory}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryRegisterModal
