import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomButton from "../../customComponents/CustomButton";
import CustomTextField from "../../customComponents/CustomTextField";
import Rating from "@mui/material/Rating";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";
import Grid from "@mui/material/Grid2";

function ExitFeedbackForm() {
  const { setAlert } = useContext(AlertContext);
  const formik = useFormik({
    initialValues: {
      overall_job_satisfaction: 0,
      opportunity_to_utilize_skills: 0,
      workload_and_stress_management: 0,
      quality_of_communication: "",
      support_from_manager: "",
      appreciation_for_work: "",
      collaboration_within_the_team: "",
      overall_company_culture: "",
      suggestions: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await apiClient.post(`/add-exit-feedback`, values);

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
      <Grid container>
        <Grid size={4}>
          Overall job satisfaction
          <br />
          <Rating
            name="overall_job_satisfaction"
            value={formik.values.overall_job_satisfaction}
            onChange={(event, newValue) => {
              formik.setFieldValue("overall_job_satisfaction", newValue);
            }}
          />
        </Grid>
      </Grid>

      <h5>Management & Team Environment</h5>
      <Grid container>
        <Grid size={4}>
          <CustomTextField
            id="quality_of_communication"
            name="quality_of_communication"
            label="Quality of communication"
            formik={formik}
            useSpeech={true}
          />
        </Grid>
        <Grid size={4}>
          <CustomTextField
            id="support_from_manager"
            name="support_from_manager"
            label="Support from manager"
            formik={formik}
            useSpeech={true}
          />
        </Grid>
        <Grid size={4}>
          <CustomTextField
            id="appreciation_for_work"
            name="appreciation_for_work"
            label="Appreciation for work"
            formik={formik}
            useSpeech={true}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={4}>
          <CustomTextField
            id="collaboration_within_the_team"
            name="collaboration_within_the_team"
            label="Collaboration within the team"
            formik={formik}
            useSpeech={true}
          />
        </Grid>
        <Grid size={4}>
          <CustomTextField
            id="overall_company_culture"
            name="overall_company_culture"
            label="Overall company culture"
            formik={formik}
            useSpeech={true}
          />
        </Grid>
      </Grid>

      <CustomTextField
        id="suggestions"
        name="suggestions"
        label="Suggestions for improvement"
        formik={formik}
        multiline
        rows={2}
        useSpeech={true}
      />
      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(ExitFeedbackForm);
