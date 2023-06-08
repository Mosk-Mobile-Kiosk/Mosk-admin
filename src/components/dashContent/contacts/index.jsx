import { Box, Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../../../theme"
import Header from "../../common/header/Header"
import { useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import CategoryRegisterModal from "./CategoryRegisterModal"
import CategoryUpdateModal from "./CategoryUpdateModal"

const Contacts = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const [openCategoryRegisterModal, setOpenCategoryRegisterModal] = useState(false)
  const [openCategoryUpdateModal, setOpenCategoryUpdateModal] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  const handleOpenCategoryRegisterModal = () => {
    setOpenCategoryRegisterModal(true)
  }

  const handleOpenCategoryUpdaterModal = (categoryId) => {
    setOpenCategoryUpdateModal(true)

    fetch("http://localhost:9090/api/v1/categories/" + categoryId, {
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
        console.log(data.data)
        setCategory(data.data)
      })
  }

  const handleCategoryChage = (category) => {
    setCategories([...categories, category])
  }

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

  const categoryDeleteRequest = (categoryId) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      fetch("http://localhost:9090/api/v1/categories/" + categoryId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (response.ok) {
          const filterCategories = categories.filter((category) => category.id !== categoryId)
          setCategories(filterCategories)
        }
      })
    }
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "name" },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={(e) => handleOpenCategoryUpdaterModal(params.row.id)}
          >
            변경
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={(e) => categoryDeleteRequest(params.row.id)}
          >
            삭제
          </Button>
        </Box>
      ),
    },
  ]
  return (
    <Box m="20px">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <Header title="카테고리 관리" subtitle="List of Contacts for Future Reference" />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="outlined" color="primary" sx={{ height: "40px" }} onClick={handleOpenCategoryRegisterModal}>
            카테고리관리
          </Button>
        </Box>
      </Box>
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={categories} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
      <CategoryRegisterModal
        categories={categories}
        setCategories={setCategories}
        openCategoryRegisterModal={openCategoryRegisterModal}
        setOpenCategoryRegisterModal={setOpenCategoryRegisterModal}
        handleCategoryChage={handleCategoryChage}
        category={category}
      />
      <CategoryUpdateModal
        openCategoryUpdateModal={openCategoryUpdateModal}
        setOpenCategoryUpdateModal={setOpenCategoryUpdateModal}
        category={category}
        setCategories={setCategories}
      />
    </Box>
  )
}

export default Contacts
