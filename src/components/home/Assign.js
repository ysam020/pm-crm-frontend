import React, { Suspense, useState } from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import useUserList from "../../hooks/useUserList";
const AssignModule = React.lazy(() => import("./AssignModule"));

function Assign() {
  const userList = useUserList();
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Autocomplete
          value={selectedUser}
          onChange={(event, newValue) => {
            setSelectedUser(newValue);
          }}
          options={userList}
          getOptionLabel={(option) => option}
          sx={{ width: 200, marginBottom: "20px" }}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Select User" />
          )}
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AssignModule selectedUser={selectedUser} />
      </Suspense>
    </>
  );
}

export default React.memo(Assign);
