import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import useUserList from "../../../hooks/useUserList";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";

function TrainingForm() {
  const userList = useUserList();
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      trainingProgram: "",
      trainingDate: "",
      duration: "",
      trainingProvider: "",
      feedback: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiClient.post(`/add-training`, values);

        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (err) {
        setAlert({
          open: true,
          message:
            err.message === "Network Error"
              ? "Network Error, your details will be submitted when you are back online"
              : err.response.data.message,
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
          formik.setFieldValue("username", newValue); // Update Formik state
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

      <CustomTextField
        id="trainingProgram"
        name="trainingProgram"
        label="Training Program"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="trainingDate"
        name="trainingDate"
        label="Training Date"
        type="date"
        formik={formik}
      />

      <CustomTextField
        id="duration"
        name="duration"
        label="Duration (in hours)"
        type="number"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="trainingProvider"
        name="trainingProvider"
        label="Training Provider"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="feedback"
        name="feedback"
        label="Feedback"
        multiline
        rows={4}
        formik={formik}
        useSpeech={true}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(TrainingForm);
