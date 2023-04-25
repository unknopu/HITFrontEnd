import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StorageIcon from '@mui/icons-material/Storage';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import EngineeringIcon from '@mui/icons-material/Engineering';
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import LanIcon from '@mui/icons-material/Lan';
import apiHealthCheck from './healthcheck.jsx'
import {createContext, useState} from "react";
import axios from 'axios';
// ==============================================

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [apiStatus, setApiStatus] = useState("0");
  const [redisStatus, setRedisStatus] = useState("0");
  const [mongoDBStatus, setMongoDBStatus] = useState("0");


  // axios.get('https://kidscare-files.s3.ap-southeast-1.amazonaws.com/2023/3/22/906a8083-0a29-4bbf-95e3-274142336185_l.jpg')
  // .then((response) => {
  //   // console.log(response.data);
  //   console.log(response.status);
  //   console.log(response.statusText);
  //   console.log(response.headers);
  //   console.log(response.config);
  // });
  
  const res = fetch("https://kidscare-files.s3.ap-southeast-1.amazonaws.com/2023/3/22/906a8083-0a29-4bbf-95e3-274142336185_l.jpg", {
    responseType: "blob",
  })
  .then((response) => console.log(response))




// ==============================================
  if (mongoDBStatus == "0") {
    apiHealthCheck("/mongodb").then(jsondata => {
      jsondata['is_healthy']==true ? setMongoDBStatus("100"):setMongoDBStatus("0") 
    });
  }
  if (redisStatus == "0") {
    apiHealthCheck("/redis").then(jsondata => {
      jsondata['is_healthy']==true ? setRedisStatus("100"):setRedisStatus("0") 
    });
  }
  if (apiStatus == "0") {
    apiHealthCheck("/healthcheck").then(jsondata => {
      jsondata['is_healthy']==true ? setApiStatus("100"):setApiStatus("0") 
    });
  }
// ==============================================

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="仪表盘" subtitle="欢迎使用仪表盘" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            下载最新报告
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Mongo数据库状态"
            subtitle={mongoDBStatus=="100"? "健康": "不健康"}
            progress={mongoDBStatus}
            increase={`${mongoDBStatus}%`}
            icon={
              <StorageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Redis数据库状态"
            subtitle={redisStatus=="100"? "健康": "不健康"}
            progress={redisStatus}
            increase={`${redisStatus}%`}
            icon={
              <LanIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="后端状态"
            subtitle={apiStatus=="100"? "健康": "不健康"}
            progress={apiStatus}
            increase={`${apiStatus}%`}
            icon={
              <EngineeringIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="600"
                color={colors.grey[100]}
              >
                已识别的漏洞
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                一共：xxxx
              </Typography>
            </Box>
            <Box>
              {/* <IconButton> */}
                {/* <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                /> */}
              {/* </IconButton> */}
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 风险级别 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h4" fontWeight="600">
            风险级别
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              High
            </Typography>
            <Typography>本报告是根据 OWASP Top Ten 2021 分类生成的。</Typography>
          </Box>
        </Box>

        {/* ROW 2.2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        

        {/* Bar chart */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
