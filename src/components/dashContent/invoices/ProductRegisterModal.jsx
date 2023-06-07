import React, { useState } from "react"
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Input,
} from "@mui/material"

const ProductRegisterModal = ({
  openProductRegisterModal,
  setOpenProductRegisterModal,
  categories,
  handleProductsChange,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [imageName, setImageName] = useState("")
  const [imageType, setImageType] = useState("")

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const handlePrice = (event) => {
    setPrice(event.target.value)
  }

  const handleImage = (event) => {
    const file = event.target.files[0]
    setImage(file)

    setImageType(file.name.split(".").pop())
    setImageName(file.name)
  }

  const handleCloseModal = () => {
    setOpenProductRegisterModal(false)
  }

  const submitCreateProduct = () => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64Image = reader.result

      const productCreateRequestBody = {
        categoryId: selectedCategoryId,
        name: name,
        description: description,
        price: price,
        encodedImg: base64Image,
        imgType: imageType,
      }
      fetch("http://localhost:9090/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
        body: JSON.stringify(productCreateRequestBody),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data.data)
          handleProductsChange(data.data)
          setOpenProductRegisterModal(false)
        })
    }

    reader.readAsDataURL(image)
  }

  return (
    <Dialog open={openProductRegisterModal} onClose={handleCloseModal} fullWidth>
      <DialogTitle>메뉴 추가</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl>
            <InputLabel id="category-label">카테고리 선택</InputLabel>
            <Select
              labelId="category-label"
              label="카테고리 선택"
              value={categories.length > 0 ? selectedCategoryId : ""}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id} name="categoryId">
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="메뉴 이름" name="name" onChange={handleNameChange} />
          <TextField label="설명" name="description" onChange={handleDescription} />
          <TextField label="가격" type="number" name="price" onChange={handlePrice} />
          <Input
            id="image-upload"
            name="image"
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            sx={{ display: "none" }}
            onChange={handleImage}
          />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span">
              {imageName ? imageName : "상품이미지 선택"} {/* 파일 이름 표시 */}
            </Button>
          </label>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", margin: "0 15px" }}>
        <Button variant="contained" color="primary" onClick={handleCloseModal}>
          취소
        </Button>
        <Button variant="outlined" color="primary" onClick={submitCreateProduct}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductRegisterModal
