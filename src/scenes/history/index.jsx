import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useState, useEffect} from "react";
import React  from 'react';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  const columns = [
    { 
      field: "id", 
      headerName: "行号", 
      flex: 0.5 ,
      headerAlign: "center",
      align: "center",
    },
    { 
      field: "registrar", 
      headerName: "Registrar ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "report_id",
      headerName: "报告编号",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "update_at",
      headerName: "更新于",
      headerAlign: "center",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "target",
      headerName: "目标",
      flex: 2.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "risk_rate",
      headerName: "风险率",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "vulnerabilities",
      headerName: "漏洞",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "detail",
      headerName: "detail",
      headerAlign: "center",
      align: "center",
      flex: 1,
      headerAlign: "center",
      align: "center",
    }
  ];

  var dataHistory = []
  useEffect(() => {
    fetch(`http://helmtail.tech/api/v1/report/history`)
      .then(res => res.json())
      .then(
        (result) => {
          setData([])
          if (result.length > 0) {
            dataHistory = []
            for (let i = 0; i < result.length; i++) {
              dataHistory.push({
                id: i+1,
                registrar: "admin",
                report_id: result[i].id,
                update_at: result[i].updated_at,
                target: result[i].url,
                risk_rate: result[i].page_information.risk_rate + "%",
                vulnerabilities: result[i].page_information.total_number_of_vulnerability,
                detail: "",
              })
            }
          }
          setData(dataHistory)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])
  
  return (
    <Box m="20px">
      <Header
        title="报告历史"
        subtitle="报告历史"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
