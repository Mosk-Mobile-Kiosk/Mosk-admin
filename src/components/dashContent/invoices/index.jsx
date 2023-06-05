import React, { useState } from "react"
import {
  Box,
  Typography,
  useTheme,
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
} from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../../../theme"
// import { mockDataInvoices } from "../../../data/mockData"
import Header from "../../common/header/Header"
import { useEffect } from "react"

const Invoices = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")

  const handleCategoryChange = (event) => {
    const value = event.target.value
    setCategory(value)
    if (value === "") {
      setCustomCategory("") // Reset the custom category input
    }
  }

  const handleCustomCategoryChange = (event) => {
    setCustomCategory(event.target.value)
  }

  const handleAddCustomCategory = () => {
    if (customCategory.trim() !== "") {
      setProducts([...products, { name: customCategory, id: customCategory }]) // 입력한 값을 새로운 옵션으로 추가합니다.
      setCategory(customCategory)
      setCustomCategory("")
    }
  }

  const handleProductsChange = (product) => {
    setProducts([...products, product])
  }

  useEffect(() => {
    fetch("http://localhost:9090/api/v1/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        setProducts(data.data)
        console.log(data.data)
      })
  }, [])

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "selling", headerName: "Selling", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <Button variant="outlined" color="primary" size="small" onClick={(e) => console.log(params.row.name)}>
            변경
          </Button>
          <Button variant="outlined" color="secondary" size="small" onClick={(e) => console.log(params.row.id)}>
            삭제
          </Button>
        </Box>
      ),
    },
  ]

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Box m="0 20px">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <Header title="Set Menu" />
        <Button variant="outlined" color="primary" onClick={handleOpenModal} sx={{ height: "40px" }}>
          메뉴등록
        </Button>
      </Box>
      <Box
        // m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          " & .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={products} columns={columns} />
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
        <DialogTitle>메뉴 추가</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl>
              <InputLabel id="category-label">카테고리 선택</InputLabel>
              <Select labelId="category-label" label="카테고리 선택" value={category} onChange={handleCategoryChange}>
                {category === "" && <MenuItem value="">직접 입력</MenuItem>}
                {category === "" && (
                  <MenuItem value={customCategory}>
                    <TextField
                      label="직접 입력"
                      value={customCategory}
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleCustomCategoryChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddCustomCategory}>
                      추가
                    </Button>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <TextField label="메뉴 이름" />
            <TextField label="설명" />
            <TextField label="가격" type="number" />
            <TextField label="옵션 그룹 선택" />
            <TextField label="메뉴 이름" />
            <TextField label="설명" />
            <TextField label="가격" type="number" />
            <TextField label="옵션 그룹 선택" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between", margin: "0 15px" }}>
          <Button variant="contained" color="primary" onClick={handleCloseModal}>
            취소
          </Button>
          <Button variant="outlined" color="primary">
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Invoices
