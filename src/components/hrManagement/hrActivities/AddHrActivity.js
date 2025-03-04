import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import { validationSchema } from "../../../schemas/hrManagement/hrActivitiesSchema";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";

function AddHrActivity() {
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      time: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await apiClient.post(`/add-hr-activity`, values);
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
      <div className="flex-div">
        <CustomTextField
          id="title"
          name="title"
          label="Title"
          type="text"
          formik={formik}
          useSpeech={true}
        />
      </div>

      <CustomTextField
        id="description"
        name="description"
        label="Description"
        type="text"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="date"
        name="date"
        label="Date"
        type="date"
        formik={formik}
      />

      <CustomTextField
        id="time"
        name="time"
        label="Time"
        type="time"
        formik={formik}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(AddHrActivity);
