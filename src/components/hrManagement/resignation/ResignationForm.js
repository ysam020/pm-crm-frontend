import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomButton from "../../customComponents/CustomButton";
import CustomTextField from "../../customComponents/CustomTextField";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";

function ResignationForm() {
  const { setAlert } = useContext(AlertContext);
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await apiClient.post(`/add-resignation`, values);

        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        resetForm();
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
      <CustomTextField
        id="reason"
        name="reason"
        label="Reason for resigning"
        formik={formik}
        multiline
        rows={2}
        useSpeech={false}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(ResignationForm);
