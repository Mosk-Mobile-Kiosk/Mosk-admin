import React, { useEffect, useState } from "react"
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"

const CategoryUpdateModal = ({ openCategoryUpdateModal, setOpenCategoryUpdateModal, category, setCategories }) => {
  const [name, setName] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  useEffect(() => {
    setName(category.name)
    setSelectedCategoryId(category.id)
  }, [category])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleCloseModal = () => {
    setOpenCategoryUpdateModal(false)
  }

  const categoryInfoUpdate = (updatedCategory) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => {
        if (category.id === updatedCategory.id) {
          return updatedCategory
        }
        return category
      })

      return updatedCategories
    })
  }

  const categoryUpdateRequest = () => {
    const categoryUpdateRequestBody = {
      categoryId: selectedCategoryId,
      name: name,
    }

    fetch("http://localhost:9090/api/v1/categories", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(categoryUpdateRequestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        console.log(data.data)
        categoryInfoUpdate(data.data)
        setOpenCategoryUpdateModal(false)
      })
  }

  return (
    <Dialog open={openCategoryUpdateModal} onClose={handleCloseModal} fullWidth>
      <DialogTitle>카테고리 변경</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="메뉴 이름" value={name || ""} name="name" onChange={handleNameChange} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", margin: "0 15px" }}>
        <Button variant="contained" color="primary" onClick={handleCloseModal}>
          취소
        </Button>
        <Button variant="outlined" color="primary" onClick={categoryUpdateRequest}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryUpdateModal
