import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicInfo from "../../profile/BasicInfo";
import { AlertContext } from "../../../contexts/AlertContext";
import apiClient from "../../../config/axiosConfig";

function ViewIndividualKyc() {
  const { username } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await apiClient(`/get-user-data/${username}`);

        setData(res.data);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    }

    getUser();
  }, [username]);

  const handleKycApproval = async (status) => {
    const kyc_approval = status === true ? "Approved" : "Rejected";

    try {
      const res = await apiClient.post(`/kyc-approval`, {
        username,
        kyc_approval,
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
  };

  return (
    <>
      {data && (
        <div style={{ padding: 20 }}>
          <BasicInfo user={data} />
          <br />
          <button className="btn" onClick={() => handleKycApproval(true)}>
            Approve
          </button>
          <button
            className="btn"
            style={{ marginLeft: "10px" }}
            onClick={() => handleKycApproval(false)}
          >
            Reject
          </button>
          <button
            className="btn"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate(`/edit-kyc/${data.username}`)}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
}

export default React.memo(ViewIndividualKyc);
