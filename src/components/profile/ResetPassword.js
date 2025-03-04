import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomTextField from "../customComponents/CustomTextField";
import { validationSchema } from "../../schemas/auth/resetPasswordSchema";
import CustomButton from "../../components/customComponents/CustomButton";
import { AlertContext } from "../../contexts/AlertContext";
import apiClient from "../../config/axiosConfig";

function ResetPassword() {
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await apiClient.put(`/reset-password`, values);

        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        resetForm();
      } catch (error) {
        setAlert({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="profile-container">
      <CustomTextField
        id="password"
        name="password"
        label="Current password"
        type="password"
        formik={formik}
      />
      <CustomTextField
        id="new_password"
        name="new_password"
        label="New password"
        type="password"
        formik={formik}
      />
      <CustomTextField
        id="confirm_password"
        name="confirm_password"
        label="Confirm password"
        type="password"
        formik={formik}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(ResetPassword);
