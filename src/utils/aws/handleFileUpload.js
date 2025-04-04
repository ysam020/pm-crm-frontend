import apiClient from "../../config/axiosConfig";

export const handleFileUpload = async (
  e,
  formikField,
  folderName,
  formik,
  setFileSnackbar,
  multiple
) => {
  const files = e.target.files;
  if (!files || files.length === 0) {
    alert("No file selected");
    return;
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  try {
    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > MAX_FILE_SIZE) {
        e.target.value = null;
        alert(`File ${file.name} exceeds the 5MB limit.`);
        return;
      }

      // Step 1: Request a pre-signed URL from the server for each file
      const response = await apiClient.post(`/generate-presigned-url`, {
        fileName: file.name,
        folderName: folderName,
        fileType: file.type,
      });

      const { url } = response.data;

      // Step 2: Upload the file directly to S3 using the pre-signed URL
      const a = await apiClient.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      console.log(a);
      // Store the S3 URL without the query parameters
      const uploadedFileUrl = url.split("?")[0]; // Remove the query parameters from the S3 URL
      uploadedFiles.push(uploadedFileUrl);
    }

    // Update formik with the uploaded file URLs
    formik.setValues((values) => ({
      ...values,
      [formikField]: multiple ? uploadedFiles : uploadedFiles[0], // If multiple, set an array, otherwise set a single URL
    }));

    setFileSnackbar(true);
    e.target.value = null;
    setTimeout(() => {
      setFileSnackbar(false);
    }, 3000);
  } catch (err) {
    console.error("Error uploading file(s):", err);
    alert("Error uploading file(s). Please try again.");
  }
};
