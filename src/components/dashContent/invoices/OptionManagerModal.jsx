import React, { useState } from "react"
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material"

const OptionManagerModal = ({
  openOptionManagerModal,
  setOpenOptionManagerModal,
  product,
  optionGroups,
  setOptionGroups,
}) => {
  const [optionItems, setOptionItems] = useState([{ id: 1 }])
  const [optionGroupName, setOptionGroupName] = useState("")

  const handleOptionGroupNameChange = (event) => {
    setOptionGroupName(event.target.value)
  }

  const handleCloseModal = () => {
    setOpenOptionManagerModal(false)
    setOptionItems([{ id: 1 }])
  }

  const handleAddOption = () => {
    const newOptionId = optionItems.length + 1
    setOptionItems([...optionItems, { id: newOptionId }])
  }

  const submitCreateOption = () => {
    const options = optionItems.map((item) => {
      const optionName = document.getElementsByName(`optionName_${item.id}`)[0].value
      const optionPrice = document.getElementsByName(`optionPrice_${item.id}`)[0].value
      if (optionName && optionPrice) {
        return { name: optionName, price: optionPrice }
      }
    })

    console.log(options)

    const createOptionRequestBody = {
      name: optionGroupName,
      productId: product.id,
      options: options,
    }

    fetch("http://localhost:9090/api/v1/optiongroups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(createOptionRequestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        console.log(data)
      })

    console.log(createOptionRequestBody)
  }

  const optionDeleteRequest = (optionId) => {
    fetch(`http://localhost:9090/api/v1/options/${optionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.ok) {
        const updatedOptionGroups = optionGroups.map((optionGroup) => ({
          ...optionGroup,
          options: optionGroup.options.filter((option) => option.id !== optionId),
        }))
        setOptionGroups(updatedOptionGroups)
      }
    })
  }

  return (
    <Dialog open={openOptionManagerModal} onClose={handleCloseModal} fullWidth>
      <DialogTitle>옵션관리</DialogTitle>
      <DialogContent>
        {optionGroups.map((optionGroup) => (
          <Box key={optionGroup.id} display="flex" alignItems="center" gap={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>옵션 명({optionGroup.name})</TableCell>
                  <TableCell>옵션 가격</TableCell>
                  <TableCell>관리</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {optionGroup.options.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell>{option.name}</TableCell>
                    <TableCell>{option.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ height: "100%" }}
                        onClick={() => optionDeleteRequest(option.id)}
                      >
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ))}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="옵션그룹 명" name="optionGroupName" onChange={handleOptionGroupNameChange} />
          {optionItems.map((item) => (
            <Box key={item.id} display="flex" alignItems="center" gap={2}>
              <TextField label="옵션 명" name={`optionName_${item.id}`} />
              <TextField label="옵션 가격" type="optionPrice" name={`optionPrice_${item.id}`} />
              <Button variant="outlined" color="primary" onClick={handleAddOption} sx={{ height: "100%" }}>
                추가
              </Button>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", margin: "0 15px" }}>
        <Button variant="contained" color="primary" onClick={handleCloseModal}>
          취소
        </Button>
        <Button variant="outlined" color="primary" onClick={submitCreateOption}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OptionManagerModal
