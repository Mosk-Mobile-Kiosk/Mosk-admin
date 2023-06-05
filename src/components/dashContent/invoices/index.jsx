import React, { useState } from "react"
import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../../../theme"
import { mockDataInvoices } from "../../../data/mockData"
import Header from "../../common/header/Header"
import { useEffect } from "react"

const Invoices = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [products, setProducts] = useState([])

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
  ]

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoices Balances" />
      <Box
        m="40px 0 0 0"
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
    </Box>
  )
}

export default Invoices
