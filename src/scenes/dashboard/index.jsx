import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StorageIcon from '@mui/icons-material/Storage';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import LanIcon from '@mui/icons-material/Lan';
import apiHealthCheck from './healthcheck.jsx'
import {myrisk, mylevel, mapTransaction} from './utils.jsx'
import {useState, useEffect} from "react";
import React  from 'react';

// ==============================================

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [apiStatus, setApiStatus] = useState("100");
  const [redisStatus, setRedisStatus] = useState("0");
  const [mongoDBStatus, setMongoDBStatus] = useState("100");
  
  const [riskLevel, setRiskLevel] = useState(0);
  const [allVul, setAllVul] = useState(0);
  const [reportID, setReportID] = useState("0000000000000000");
  const [lineData, setLineData] = useState([0,1,2,3,4]);


  const [data, setData] = useState([]);
  const [sqli, setSqli] = useState([]);
  const [fli, setLfi] = useState([]);
  const [missConfig, setMissConfig] = useState([]);
  const [xss, setXss] = useState([]);
  const [outeddateComponents, setOuteddateComponents] = useState([]);
  const [cryptoFailure, setCtyptoFailure] = useState([]);

  useEffect(() => {
    fetch(`http://helmtail.tech/api/v1/report/latest`)
      .then(res => res.json())
      .then(
        (result) => {
          setRiskLevel(result.page_information.risk_rate)
          setAllVul(result.page_information.total_number_of_vulnerability)
          setReportID(result.id)
          setLineData([result.page_information.type_injection,
            result.page_information.type_broken_access_control,
            result.page_information.type_crypto_failure,
            result.page_information.type_miss_configuration,
            result.page_information.type_outdated_components
          ])

          setData(result)
          
          if (result.sqli != null) {
            setSqli(result.sqli.entities)
          }
          if (result.lfi != null) {
            setLfi(result.lfi.entities)
          }
          if (result.miss_config != null) {
            setMissConfig(result.miss_config.entities)
          }
          if (result.xss != null) {
            setXss(result.xss.entities)
          }
          if (result.outdated_component != null) {
            setOuteddateComponents(result.outdated_component.entities)
          }
          if (result.crypto_failure != null) {
            setCtyptoFailure(result.crypto_failure.entities)
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  var datamapped = mapTransaction(sqli, fli, missConfig, xss, outeddateComponents, cryptoFailure)

// ==============================================
  // if (mongoDBStatus == "0") {
  //   apiHealthCheck("/mongodb").then(jsondata => {
  //       jsondata['is_healthy']==true ? setMongoDBStatus("100"):setMongoDBStatus("0") 
  //   });
  // }
  // if (redisStatus == "0") {
  //   apiHealthCheck("/redis").then(jsondata => {
  //       jsondata['is_healthy']==true ? setRedisStatus("100"):setRedisStatus("0") 
  //   });
  // }
  // if (apiStatus == "0") {
  //   apiHealthCheck("/healthcheck").then(jsondata => {
  //       jsondata['is_healthy']==true ? setApiStatus("100"):setApiStatus("0") 
  //   });
  // }
// ==============================================

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="仪表盘" subtitle="欢迎使用仪表盘" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[300],
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
                已识别的漏洞类型
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                报告编号：{reportID}
              </Typography>
            </Box>
            <Box>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} linedata={lineData}/>
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
            <ProgressCircle size="125" progress={myrisk(riskLevel)}/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {/* {myrisklevel(riskLevel)} */}
              HIHG
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
            <Typography 
              color={colors.grey[100]} 
              variant="h3" 
              fontWeight="700" 
              padding="0.1rem"
            >
            <h4>已确定的漏洞 (一共：{allVul})</h4>
            </Typography>
          </Box>
          {datamapped.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              borderRadius="1rem"

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
                  {transaction.type} 
                </Typography>
                <Box 
                color={colors.grey[100]}
                backgroundColor={mylevel(colors, transaction.level)}
                borderRadius="2rem"
                padding=".3rem"
                paddingLeft="1rem"
                width="35rem"
              >
                ({transaction.vulnerability})
              </Box>
              </Box>
              
              <Box
                backgroundColor={mylevel(colors, transaction.level)}
                p="5px 10px"
                borderRadius="4px"
                width="6rem"
                padding="1rem"
                textAlign="center"
              >
                {transaction.level}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
