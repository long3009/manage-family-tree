import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DataTable from "./MyTable";
import SimpleDialog from "./DataDialog";
import dayjs from "dayjs";
const rows = [{ id: 1, name: "Snow", spouses: [] }];
const defaultAddRow = { name: "", spouses: [] };
export default function App() {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [dialogData, setDialogData] = React.useState({});
  const [tableRows, setTableRows] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [jsonURL, setJsonURL] = React.useState(
    "https://raw.githubusercontent.com/long3009/familytree/main/fm1.json"
  );
  React.useEffect(() => {
    const newOptions = tableRows.map((r) => `${r.id}-${r.name}`);
    setOptions(newOptions);
  }, [tableRows]);
  const convertDate = (dateString) => {
    console.log("dateString", dateString);
    const dateParts = dateString.split("/");
    console.log("dateParts", dateParts);
    // month is 0-based, that's why we need dataParts[1] - 1
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    console.log("conve", dateObject);
    return dateObject;
  };
  React.useEffect(() => {
    console.log("URL", process.env.JSON_URL);
    fetch(jsonURL)
      .then((response) => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        // console.log(jsonData);
        let rows = [];
        jsonData.forEach((item) => {
          let spouses = [];
          item.spouses.forEach((s) => {
            const findSpouse = jsonData.find(
              (d) => d.id.toString() === s.id.toString()
            );
            if (findSpouse) {
              spouses.push(`${s.id}-${findSpouse.info.name}`);
            }
          });
          const row = {
            id: item.id,
            name: item.info.name,
            dad: item.parents.length > 0 ? item.parents[0] : null,
            mom: item.parents.length > 1 ? item.parents[1] : null,
            spouses: spouses,
            gender: item.gender,
            birth: convertDate(item.info.birth),
            avatar: item.info.avatar,
            death: convertDate(item.info.death),
            note: item.info.note,
          };
          rows.push(row);
        });
        console.log("rows", rows);
        setTableRows(rows);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  }, [jsonURL]);

  const handleClickAddOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setDialogData({
      name: "",
      dad: null,
      mom: null,
      spouses: [],
      gender: "male",
      birth: new Date(),
      avatar: "",
      death: new Date(),
      note: "",
    });
  };
  const handleClickEditOpen = () => {
    setOpen(true);
    setIsEdit(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    console.log("data", value);
    if (!isEdit) {
      const newRows = {
        id: tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1,
        name: value.name,
        dad: value.dad,
        mom: value.mom,
        spouses: value.spouses,
        gender: value.gender,
        birth: value.birth,
        avatar: value.avatar,
        death: value.death,
        note: value.note,
      };
      setTableRows([...tableRows, newRows]);
    } else {
      const findIdx = tableRows.findIndex((r) => r.id === value.id);
      if (findIdx > -1) {
        tableRows[findIdx] = value;
        setTableRows([...tableRows]);
      }
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleRowClick = (e) => {
    console.log("row lcik", e);
    setDialogData(e.row);
  };
  const handleClickDelete = (e) => {
    const newTableRows = tableRows.filter((r) => r.id !== dialogData.id);
    setTableRows([...newTableRows]);
  };
  const handleClickSave = () => {
    console.log("save", tableRows);
    let convertData = [];
    tableRows.forEach((item, index) => {
      let parents = [];
      if (item.dad !== null) {
        parents.push({
          id: getId(item.dad).toString(),
          type: "blood",
        });
      }
      if (item.mom !== null) {
        parents.push({
          id: getId(item.mom).toString(),
          type: "blood",
        });
      }
      let spouses = [];
      item.spouses.forEach((s) => {
        spouses.push({
          id: getId(s),
          type: "married",
        });
      });

      let children = [];
      const listChilds = tableRows.filter(
        (i) =>
          getId(i.dad) === item.id.toString() ||
          getId(i.mom) === item.id.toString()
      );
      listChilds.forEach((c) => {
        children.push({
          id: c.id.toString(),
          type: "blood",
        });
      });

      let avatar = item.avatar;
      if (avatar === "") {
        if (item.gender === "male") {
          avatar =
            "https://github.com/long3009/familytree/blob/0ff9f33f3d5ae8afaa6327df3b96846ff7e9eafa/man-avatar.png?raw=true";
        } else {
          avatar =
            "https://github.com/long3009/familytree/blob/main/woman-avatar.png?raw=true";
        }
      }
      const formatData = {
        id: item.id.toString(),
        gender: item.gender,
        parents: parents,
        siblings: [],
        spouses: spouses,
        children: children,
        info: {
          name: item.name,
          birth: dayjs(item.birth).format("DD/MM/YYYY"),
          death: dayjs(item.death).format("DD/MM/YYYY"),
          note: item.note,
          avatar: avatar,
        },
      };
      convertData.push(formatData);
    });
    handleSaveToPC(convertData);
    console.log(convertData);
  };
  const handleSaveToPC = (data) => {
    const fileData = JSON.stringify(data, null, 4);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "config.json";
    link.href = url;
    link.click();
  };
  const getId = (value) => {
    if (!value) return null;
    const splits = value.split("-");
    return splits[0];
  };
  return (
    <Container maxWidth="lg">
      <Button variant="contained" onClick={handleClickAddOpen}>
        ADD
      </Button>
      <Button variant="contained" onClick={handleClickEditOpen}>
        Edit
      </Button>
      <Button variant="contained" onClick={handleClickDelete}>
        Delete
      </Button>
      <Button variant="contained" onClick={handleClickSave}>
        Save
      </Button>
      <DataTable rows={tableRows} rowClick={handleRowClick} />
      <SimpleDialog
        open={open}
        onClose={handleClose}
        onCancel={handleCancel}
        data={dialogData}
        options={options}
        isEdit={isEdit}
      />
    </Container>
  );
}
