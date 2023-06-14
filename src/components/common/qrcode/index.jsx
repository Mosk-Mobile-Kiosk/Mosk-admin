import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IconButton } from "@mui/material"
import PrintIcon from "@mui/icons-material/Print"

const QrCode = () => {
  const [qrCodeImage, setQRCodeImage] = useState(null)

  const getQRCode = () => {
    fetch("http://localhost:9090/api/v1/stores/qrcode", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob)
        setQRCodeImage(imageURL)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  useEffect(() => {
    getQRCode()
  }, [])

  const printQRCode = () => {
    const printWindow = window.open("", "_blank")
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
        </head>
        <body>
          <img src="${qrCodeImage}" alt="QR Code" />
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `)
  }

  return (
    <div>
      <IconButton onClick={printQRCode} aria-label="Print QR Code">
        <PrintIcon />
      </IconButton>
      {/* <button onClick={getQRCode}>Get QR Code</button> */}
      {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
    </div>
  )
}

export default QrCode
