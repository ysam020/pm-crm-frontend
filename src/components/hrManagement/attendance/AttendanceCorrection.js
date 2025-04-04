import React, { useContext } from "react";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import useUserList from "../../../hooks/useUserList";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";

function AttendanceCorrection() {
  const userList = useUserList();
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      timeIn: "",
      timeOut: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await apiClient.put(`/attendance-correction`, values);

        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (error) {
        setAlert({
          open: true,
          message:
            error.message === "Network Error"
              ? "Network Error, your details will be submitted when you are back online"
              : error.response.data.message,
          severity: "error",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        value={formik.values.username}
        onChange={(event, newValue) => {
          formik.setFieldValue("username", newValue);
        }}
        options={userList}
        getOptionLabel={(option) => option || ""}
        sx={{ marginBottom: "10px" }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="login-input"
            fullWidth
            variant="filled"
            size="small"
            label="Select User"
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        )}
      />

      <Grid container spacing={1}>
        <Grid size={{ xs: 4, sm: 4, md: 4, lg: 6 }}>
          <CustomTextField
            id="timeIn"
            name="timeIn"
            label="Time In"
            type="time"
            formik={formik}
          />
        </Grid>

        <Grid size={{ xs: 4, sm: 4, md: 4, lg: 6 }}>
          <CustomTextField
            id="timeOut"
            name="timeOut"
            label="Time Out"
            type="time"
            formik={formik}
          />
        </Grid>
      </Grid>

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(AttendanceCorrection);
