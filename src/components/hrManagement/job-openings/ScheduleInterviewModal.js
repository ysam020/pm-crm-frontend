import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";
import { style } from "../../../utils/modalStyle";
import CustomButton from "../../customComponents/CustomButton";

function ScheduleInterviewModal({
  open,
  handleClose,
  jobTitle,
  email,
  name,
  _id,
}) {
  const { setAlert } = useContext(AlertContext);

  const validationSchema = Yup.object({
    dateTime: Yup.date().required("Please select date and time"),
  });

  const formik = useFormik({
    initialValues: { dateTime: null },
    validationSchema,
    onSubmit: async (values) => {
      const startDate = values.dateTime.toDate();
      const endDate = new Date(startDate.getTime() + 1 * 60 * 60000); // Add 1 hour duration

      const formatDate = (date) => {
        return dayjs(date).format("YYYYMMDDTHHmmss");
      };

      try {
        const res = await apiClient.put(`/schedule-interview`, {
          jobTitle,
          email,
          name,
          interviewDateTime: startDate,
          interviewStartTime: formatDate(startDate),
          interviewEndTime: formatDate(endDate),
          _id,
        });

        handleClose();
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <h5>Select date and time for interview</h5>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select interview date and time"
              value={formik.values.dateTime}
              onChange={(newValue) =>
                formik.setFieldValue("dateTime", newValue)
              }
              disablePast
              closeOnSelect={false}
              ampm={false}
              minutesStep={15}
              shouldDisableDate={(date) => date.day() === 0}
            />
          </LocalizationProvider>
          {formik.errors.dateTime && (
            <p style={{ color: "red" }}>{formik.errors.dateTime}</p>
          )}

          <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
        </form>
      </Box>
    </Modal>
  );
}

export default React.memo(ScheduleInterviewModal);
