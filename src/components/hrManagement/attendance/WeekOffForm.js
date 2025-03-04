import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import { validationSchema } from "../../../schemas/hrManagement/attendanceAndLeaves/weekOffSchema";
import ViewOwnWeekOffs from "./ViewOwnWeekOffs";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";

function WeekOffForm() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const { setAlert } = useContext(AlertContext);

  async function getWeekOffs() {
    try {
      setLoading(true);
      const [year, month] = date.split("-");
      const res = await apiClient(`/get-own-week-offs/${year}-${month}`);

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await apiClient.put(`/add-week-off`, values);
        getWeekOffs();
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
        id="date"
        name="date"
        label="Date"
        type="date"
        formik={formik}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
      <br />
      <br />
      <h4>My Week Offs</h4>
      <ViewOwnWeekOffs
        getWeekOffs={getWeekOffs}
        date={date}
        setDate={setDate}
        data={data}
        loading={loading}
      />
    </form>
  );
}

export default React.memo(WeekOffForm);
