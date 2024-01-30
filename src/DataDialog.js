import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
function SimpleDialog(props) {
  const { onClose, data, open, options, onCancel, isEdit } = props;
  const [name, setName] = React.useState("");
  const [spousesValues, setSpousesValues] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [dadValue, setDadValue] = React.useState(null);
  const [momValue, setMomValue] = React.useState(null);
  const [genderValue, setGenderValue] = React.useState("male");
  const [birthValue, setBirthValue] = React.useState(dayjs(new Date()));
  const [avatar, setAvatar] = React.useState("");
  const [deathValue, setDeathValue] = React.useState(dayjs(new Date()));
  const [note, setNote] = React.useState("");
  React.useEffect(() => {
    data.spouses = spousesValues;
  }, [spousesValues]);
  React.useEffect(() => {
    data.dad = dadValue;
  }, [dadValue]);
  React.useEffect(() => {
    data.mom = momValue;
  }, [momValue]);
  React.useEffect(() => {
    data.gender = genderValue;
  }, [genderValue]);
  React.useEffect(() => {
    data.name = name;
  }, [name]);
  React.useEffect(() => {
    data.birth = birthValue;
  }, [birthValue]);
  React.useEffect(() => {
    data.avatar = avatar;
  }, [avatar]);
  React.useEffect(() => {
    data.death = deathValue;
  }, [deathValue]);
  React.useEffect(() => {
    data.note = note;
  }, [note]);
  React.useEffect(() => {
    console.log("update data", data);
    setSpousesValues(data.spouses);
    setDadValue(data.dad);
    setMomValue(data.mom);
    setName(data.name);
    setGenderValue(data.gender);
    setBirthValue(dayjs(data.birth));
    setAvatar(data.avatar);
    setDeathValue(dayjs(data.death));
    setNote(data.note);
  }, [data]);

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick" && "escapeKeyDown") return;
    onClose(data);
  };
  const handleCancel = () => {
    onCancel();
  };
  return (
    <Dialog open={open} style={{ width: "100%" }}>
      <DialogTitle>{isEdit ? "Edit" : "Add"}</DialogTitle>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            fullWidth
            label="Birth"
            value={birthValue}
            onChange={(newValue) => setBirthValue(newValue)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            fullWidth
            label="Death"
            value={deathValue}
            onChange={(newValue) => setDeathValue(newValue)}
          />
        </LocalizationProvider>
        <Autocomplete
          fullWidth
          id="tags-dad"
          options={options}
          getOptionLabel={(option) => option}
          value={dadValue}
          onChange={(event, newValue) => {
            setDadValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Dad" />
          )}
        />
        <Autocomplete
          fullWidth
          id="tags-mom"
          options={options}
          getOptionLabel={(option) => option}
          value={momValue}
          onChange={(event, newValue) => {
            setMomValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Mom" />
          )}
        />
        <Autocomplete
          fullWidth
          multiple
          id="tags-standard"
          options={options}
          getOptionLabel={(option) => option}
          value={spousesValues}
          onChange={(event, newValue) => {
            setSpousesValues(newValue);
          }}
          // inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          // }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Spouses" />
          )}
        />
        <Autocomplete
          fullWidth
          id="tags-gender"
          options={["male", "female"]}
          getOptionLabel={(option) => option}
          value={genderValue}
          onChange={(event, newValue) => {
            setGenderValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Gender" />
          )}
        />
        <TextField
          fullWidth
          label="Avatar"
          value={avatar}
          onChange={(event) => {
            setAvatar(event.target.value);
          }}
        />
        <TextField
          fullWidth
          label="Note"
          multiline
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
          }}
        />
        <Button onClick={handleClose}>OK</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};
export default SimpleDialog;
