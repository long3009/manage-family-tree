import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "birth",
    headerName: "Birth",
    width: 130,
    valueGetter: (params) =>  `${
        dayjs(params.row.birth).isValid()
          ? dayjs(params.row.birth).format("DD/MM/YYYY")
          : ""
      }`,
  },
  {
    field: "death",
    headerName: "Death",
    width: 130,
    valueGetter: (params) => `${
        dayjs(params.row.death).isValid()
          ? dayjs(params.row.death).format("DD/MM/YYYY")
          : ""
      }`,
  },
  { field: "dad", headerName: "Dad", width: 130 },
  { field: "mom", headerName: "Mom", width: 130 },
  { field: "spouses", headerName: "Spouses", width: 130 },
  { field: "gender", headerName: "Gender", width: 70 },
  { field: "avatar", headerName: "Avatar", width: 130 },
  {
    field: "note",
    headerName: "Note",
    width: 130,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>{params.row.note}</div>
    ),
  },
];

export default function DataTable(props) {
  const { rows, rowClick } = props;
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        onRowClick={rowClick}
      />
    </div>
  );
}
