import React, { useContext, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SaveIcon from "@mui/icons-material/Save";
import "../../styles/notes.scss";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import { useFormik } from "formik";
import apiClient from "../../config/axiosConfig";
import { AlertContext } from "../../contexts/AlertContext";

function StickyNotes() {
  const { setAlert } = useContext(AlertContext);
  const contentRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      content: "<h3>Note</h3>",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiClient.post(`/add-sticky-note`, {
          note: values.content,
        });
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

  // Load initial note data on mount
  useEffect(() => {
    async function getNote() {
      try {
        const response = await apiClient.get(`/get-sticky-note`, {
          withCredentials: true,
        });
        const content = response.data ? response.data : "<h3>Note</h3>";
        formik.setFieldValue("content", content);
        if (contentRef.current) {
          contentRef.current.innerHTML = content;
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }
    getNote();
    // eslint-disable-next-line
  }, []);

  // Set initial content
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = formik.values.content;
    }
    // eslint-disable-next-line
  }, []);

  // Handle speech recognition input
  const startSpeechRecognition = useSpeechRecognition(formik);

  const handleContentChange = (event) => {
    const updatedContent = event.target.innerHTML;
    formik.setFieldValue("content", updatedContent);
  };

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={formik.handleSubmit}>
        <div
          ref={contentRef}
          className="post-it sticky-notes"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={handleContentChange}
        ></div>
        <IconButton
          aria-label="mic"
          style={{ position: "absolute", top: "15px", right: "10px" }}
          onClick={() => startSpeechRecognition("content")}
        >
          <MicIcon />
        </IconButton>

        <IconButton
          type="submit"
          aria-label="submit"
          style={{ position: "absolute", bottom: "15px", right: "10px" }}
        >
          <SaveIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default StickyNotes;
