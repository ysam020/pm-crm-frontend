import React, { useState, useRef, useContext } from "react";
import Grid from "@mui/material/Grid2";
import { AlertContext } from "../../../contexts/AlertContext";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import CustomUploadButton from "../../customComponents/CustomUploadButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import { validationSchema } from "../../../schemas/hrManagement/attendanceAndLeaves/leaveSchema";
import ViewOwnLeaves from "./ViewOwnLeaves";
import apiClient from "../../../config/axiosConfig";

function LeaveApplication() {
  const [fileSnackbar, setFileSnackbar] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const fileInputRefs = useRef({
    medicalCertificate: null,
  });
  const { setAlert } = useContext(AlertContext);

  async function getOwnLeaves() {
    try {
      setLoading(true);
      const [year, month] = date.split("-");
      const res = await apiClient(`/get-own-leaves/${year}-${month}`);

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
      reason: "",
      sick_leave: false,
      medical_certificate: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await apiClient.post(`/add-leave`, values);
        getOwnLeaves();
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
      <Grid container spacing={1}>
        {/* Left Section */}
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <CustomTextField
            id="from"
            name="from"
            label="From"
            type="date"
            formik={formik}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <CustomTextField
            id="to"
            name="to"
            label="To"
            type="date"
            formik={formik}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <CustomTextField
            id="reason"
            name="reason"
            label="Reason"
            formik={formik}
            useSpeech={true}
          />
        </Grid>
      </Grid>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="sick_leave"
              name="sick_leave"
              checked={formik.values.sick_leave}
              onChange={formik.handleChange}
            />
          }
          label="Sick Leave"
        />
      </FormGroup>

      {formik.values.sick_leave && (
        <>
          <CustomUploadButton
            name={"Medical Certificate"}
            onChange={async (e) => {
              const { handleFileUpload } = await import(
                "../../../utils/aws/handleFileUpload"
              );
              handleFileUpload(
                e,
                "medical_certificate",
                "leaves",
                formik,
                setFileSnackbar,
                false
              );
            }}
            ref={(el) => (fileInputRefs.current.medicalCertificate = el)}
          />
          <br />

          {formik.values.medical_certificate &&
          formik.values.medical_certificate.length > 0 ? (
            <>
              <br />
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <div>
                  <a href={formik.values.medical_certificate}>View</a>
                  <br />
                </div>
                <IconButton
                  onClick={() =>
                    formik.setFieldValue("medical_certificate", [])
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </>
          ) : null}

          {formik.touched.medical_certificate &&
          formik.errors.medical_certificate ? (
            <div style={{ color: "red" }}>
              {formik.errors.medical_certificate}
            </div>
          ) : null}
        </>
      )}

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
      <br />
      <br />
      <h4>My Leave Applications</h4>
      <ViewOwnLeaves
        getOwnLeaves={getOwnLeaves}
        data={data}
        date={date}
        setDate={setDate}
        loading={loading}
      />

      <Snackbar
        open={fileSnackbar}
        message="File uploaded successfully!"
        sx={{ left: "auto !important", right: "24px !important" }}
      />
    </form>
  );
}

export default React.memo(LeaveApplication);
