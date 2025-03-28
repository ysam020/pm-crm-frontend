import React, { Suspense, useState, useMemo } from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import useUserList from "../../hooks/useUserList";
import ErrorFallback from "../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const AssignModule = React.lazy(() => import("./AssignModule"));

function Assign() {
  const rawUserList = useUserList();
  const [selectedUser, setSelectedUser] = useState("");

  // Memoize the user list to prevent unnecessary re-fetching
  const userList = useMemo(() => rawUserList || [], [rawUserList]);

  // Memoize selectedUser to avoid unnecessary re-renders
  const memoizedSelectedUser = useMemo(() => selectedUser, [selectedUser]);

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Autocomplete
          value={memoizedSelectedUser}
          onChange={(event, newValue) => setSelectedUser(newValue)}
          options={userList}
          getOptionLabel={(option) => option}
          sx={{ width: 200, marginBottom: "20px" }}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Select User" />
          )}
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <AssignModule selectedUser={memoizedSelectedUser} />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default React.memo(Assign);
