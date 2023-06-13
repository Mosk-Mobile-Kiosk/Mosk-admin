import React, { useState } from "react"
import { Box, useTheme, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { tokens } from "../../../../theme"
import Header from "../../common/header/Header"
import { useEffect } from "react"
import ProductRegisterModal from "./ProductRegisterModal"
import ProductUpdateModal from "./ProductUpdateModal"
import OptionManagerModal from "./OptionManagerModal"

const Invoices = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [products, setProducts] = useState([])
  const [openProductRegisterModal, setOpenProductRegisterModal] = useState(false)
  const [openProductUpdateModal, setOpenProductUpdateModal] = useState(false)
  const [openOptionManagerModal, setOpenOptionManagerModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({})
  const [optionGroups, setOptionGroups] = useState([])

  const handleProductsChange = (product) => {
    setProducts([...products, product])
  }

  const handleOpenProductRegisterModal = () => {
    setOpenProductRegisterModal(true)
    getCategories()
  }

  const handleOpenProductUpdateModal = (productId) => {
    setOpenProductUpdateModal(true)
    getCategories()
    products.forEach((product) => {
      if (product.id == productId) {
        setProduct(product)
        console.log(product)
      }
    })
  }

  const handleOpenOptionManagerModal = (productId) => {
    setOpenOptionManagerModal(true)
    products.forEach((product) => {
      if (product.id == productId) {
        setProduct(product)
        console.log(product)
      }
    })
    // 프로덕트아이디를 통해 프로덕트 옵션그룹과 그 하위 옵션 가져오기
    fetch(`http://localhost:9090/api/v1/public/optiongroups/all/${productId}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        setOptionGroups(data.data)
        console.log(data.data)
      })
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
    { field: "category", headerName: "Category", valueGetter: (params) => params.row.category.name },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    // { field: "selling", headerName: "Selling", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <Button
            // sx={{ m: 1 }}
            variant="outlined"
            color="primary"
            size="small"
            onClick={(e) => handleOpenOptionManagerModal(params.row.id)}
          >
            옵션관리
          </Button>
          <Button
            // sx={{ m: 1 }}
            variant="outlined"
            color="success"
            size="small"
            onClick={(e) => handleOpenProductUpdateModal(params.row.id)}
          >
            변경
          </Button>
          <Button
            // sx={{ m: 1 }}
            variant="outlined"
            color="error"
            size="small"
            onClick={(e) => productDeleteRequest(params.row.id)}
          >
            삭제
          </Button>
        </Box>
      ),
    },
  ]

  const getCategories = () => {
    fetch("http://localhost:9090/api/v1/categories", {
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
        setCategories(data.data)
      })
  }

  const productDeleteRequest = (productId) => {
    const confirmDeleteProduct = confirm("상품을 삭제하시겠습니까?")

    if (confirmDeleteProduct) {
      fetch(`http://localhost:9090/api/v1/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (response.ok) {
          const filterProducts = products.filter((product) => product.id !== productId)
          Products(filterProducts)
        }
      })
    }
  }

  return (
    <Box m="0 20px">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <Header title="메뉴등록" />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenProductRegisterModal}
            sx={{ height: "40px", marginBottom: "10px" }}
          >
            메뉴등록
          </Button>
        </Box>
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
      <ProductRegisterModal
        openProductRegisterModal={openProductRegisterModal}
        setOpenProductRegisterModal={setOpenProductRegisterModal}
        categories={categories}
        handleProductsChange={handleProductsChange}
        products={products}
      />
      <ProductUpdateModal
        openProductUpdateModal={openProductUpdateModal}
        setOpenProductUpdateModal={setOpenProductUpdateModal}
        categories={categories}
        product={product}
        setProducts={setProducts}
        handleProductsChange={handleProductsChange}
        products={products}
      />
      <OptionManagerModal
        openOptionManagerModal={openOptionManagerModal}
        setOpenOptionManagerModal={setOpenOptionManagerModal}
        product={product}
        optionGroups={optionGroups}
        setOptionGroups={setOptionGroups}
      />
    </Box>
  )
}

export default Invoices
