import { Box } from "@mui/material"
import Header from "../../common/header/Header"
import GeoChart from "../../common/geochart/index"

const Geo = () => {
  return (
    <Box m="20px">
      <Header title="Geo Chart" subtitle="Simple Geo Chart" />
      <Box height="75vh">
        <GeoChart />
      </Box>
    </Box>
  )
}

export default Geo
