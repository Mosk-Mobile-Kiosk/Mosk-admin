import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Geo = () => {
  const nav = useNavigate()
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

  return (
    <div>
      <button onClick={getQRCode}>Get QR Code</button>
      {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
    </div>
  )
}

export default Geo
