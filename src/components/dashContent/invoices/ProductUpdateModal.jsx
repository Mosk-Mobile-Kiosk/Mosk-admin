import React, { useState, useEffect } from "react"
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

const ProductUpdateModal = ({
  openProductUpdateModal,
  setOpenProductUpdateModal,
  categories,
  product,
  products,
  setProducts,
  handleProductsChange,
}) => {
  const [productId, setProductId] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [imageName, setImageName] = useState("")
  const [imageType, setImageType] = useState("")

  useEffect(() => {
    if (product && product.category) {
      setProductId(product.id)
      setSelectedCategoryId(product.category.id)
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setImageName(product.imageName)
    }
  }, [product])

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
    setOpenProductUpdateModal(false)
  }

  /*
  아래 코드가 왜 동작하는지 이유를 모르겠음 내일 확인해 보자(아직 커밋안함)
  - 상품등록 모달 분리
  - 상품정보 변경 기능구현 완료
  */
  const productInfoUpdate = (updatedProduct) => {
    // 업데이트된 제품 정보를 사용하여 products 배열을 업데이트합니다.
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === updatedProduct.id) {
          // 해당 id와 일치하는 제품을 업데이트합니다.
          return updatedProduct
        }
        // 일치하지 않는 제품은 그대로 반환합니다.
        return product
      })

      return updatedProducts
    })
  }

  const productUpdateRequest = (productUpdateRequestBody) => {
    fetch("http://localhost:9090/api/v1/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(productUpdateRequestBody),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data.data)
        productInfoUpdate(data.data)
        setOpenProductUpdateModal(false)
      })
  }

  const submitUpdateProduct = () => {
    const reader = new FileReader()

    if (image) {
      reader.onload = () => {
        const base64Image = reader.result

        const productUpdateRequestBody = {
          productId: product.id,
          categoryId: selectedCategoryId,
          name: name,
          description: description,
          price: price,
          encodedImg: base64Image,
          imgType: imageType,
        }

        productUpdateRequest(productUpdateRequestBody)
      }

      reader.readAsDataURL(image)
    } else {
      const productUpdateRequestBody = {
        productId: product.id,
        categoryId: selectedCategoryId,
        name: name,
        description: description,
        price: price,
        encodedImg: "",
        imgType: "",
      }

      productUpdateRequest(productUpdateRequestBody)
    }
  }

  return (
    <Dialog open={openProductUpdateModal} onClose={handleCloseModal} fullWidth>
      <DialogTitle>메뉴 변경</DialogTitle>
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
          <TextField label="메뉴 이름" name="name" value={name || ""} onChange={handleNameChange} />
          <TextField label="설명" name="description" value={description || ""} onChange={handleDescription} />
          <TextField label="가격" type="number" name="price" value={price || ""} onChange={handlePrice} />
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
        <Button variant="outlined" color="primary" onClick={submitUpdateProduct}>
          변경
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductUpdateModal
