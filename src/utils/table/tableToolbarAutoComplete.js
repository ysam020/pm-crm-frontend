import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export const tableToolbarAutoComplete = (
  selectedUser,
  setSelectedUser,
  userList
) => {
  return {
    renderTopToolbarCustomActions: () => (
      <Autocomplete
        value={selectedUser}
        onChange={(event, newValue) => {
          setSelectedUser(newValue);
        }}
        sx={{ width: "200px" }}
        options={userList}
        getOptionLabel={(option) => option || ""}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Select User" />
        )}
      />
    ),
  };
};
