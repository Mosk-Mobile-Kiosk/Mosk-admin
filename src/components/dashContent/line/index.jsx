import { Box } from "@mui/material"
import Header from "../../common/header/Header"
import LineChart from "../../common/linechart/index"

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  )
}

export default Line
