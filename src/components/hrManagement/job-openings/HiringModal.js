import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AlertContext } from "../../../contexts/AlertContext";
import { style } from "../../../utils/modalStyle";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import apiClient from "../../../config/axiosConfig";
import { validationSchema } from "../../../schemas/hrManagement/jobOpenings/hiring";

function HiringModal(props) {
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      salary: "",
      joining_date: "",
      reference_by: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        aadharNo: props.aadharNo,
        jobTitle: props.jobTitle,
        email: props.email,
      };

      try {
        const res = await apiClient.put(`/hire-candidate`, data);
        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        // Re-fetch job applications after rejection
        props.getJobApplications();
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
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <h3>Hire Candidate</h3>
            <CustomTextField
              id="salary"
              name="salary"
              label="Salary"
              formik={formik}
            />
            <CustomTextField
              id="joining_date"
              name="joining_date"
              label="Joining Date"
              type="date"
              formik={formik}
            />
            <CustomTextField
              id="reference_by"
              name="reference_by"
              label="Reference By"
              formik={formik}
            />
            <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(HiringModal);
