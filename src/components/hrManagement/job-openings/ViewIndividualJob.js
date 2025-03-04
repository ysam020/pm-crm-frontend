import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid2";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import HiringModal from "./HiringModal";
import RejectModal from "./RejectModal";

function ViewIndividualJob() {
  const { _id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [aadharNo, setAadharNo] = useState("");

  const [openInterviewModal, setOpenInterviewModal] = React.useState(false);
  const [openHiringModal, setOpenHiringModal] = React.useState(false);
  const [openRejectModal, setOpenRejectModal] = React.useState(false);

  const handleOpenInterviewModal = (name, email) => {
    setName(name);
    setEmail(email);
    setOpenInterviewModal(true);
  };
  const handleCloseInterviewModal = () => setOpenInterviewModal(false);

  const handleOpenHiringModal = (aadharNo, email) => {
    setAadharNo(aadharNo);
    setEmail(email);
    setOpenHiringModal(true);
  };
  const handleCloseHiringModal = () => setOpenHiringModal(false);

  const handleOpenRejectModal = (aadharNo, jobTitle) => {
    setAadharNo(aadharNo);
    setOpenRejectModal(true);
  };
  const handleCloseRejectModal = () => setOpenRejectModal(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await apiClient(`/view-job-opening/${_id}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [_id]);

  const getJobApplications = async () => {
    try {
      const res = await apiClient(`/view-applications/${_id}`);
      setJobApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobApplications();
    // eslint-disable-next-line
  }, [data, _id]);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      size: 180,
    },

    {
      accessorKey: "mobile",
      header: "Mobile",
      size: 120,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 220,
    },
    {
      accessorKey: "resume",
      header: "Resume",
      size: 120,
      Cell: ({ cell }) => {
        const base64PDF = cell.row.original.resume;

        const handleDownload = () => {
          const link = document.createElement("a");
          link.href = `data:application/pdf;base64,${base64PDF}`;
          link.download = "Resume.pdf";
          link.click();
        };

        return (
          <div>
            {base64PDF && (
              <span onClick={handleDownload} className="link">
                Download
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "score",
      header: "Score",
      size: 120,
    },
    {
      accessorKey: "aadharNo",
      header: "Aadhar No.",
      size: 120,
    },
    {
      accessorKey: "interviewDate",
      header: "Interview Date",
      size: 150,
      Cell: ({ cell }) =>
        new Date(cell.row.original.interviewDate).toLocaleString() ===
        "Invalid Date"
          ? ""
          : new Date(cell.row.original.interviewDate).toLocaleString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
    },
    {
      accessorKey: "scheduleInterviewDate",
      header: "Schedule Interview",
      size: 180,
      Cell: ({ cell }) => (
        <span
          className="link"
          onClick={() =>
            handleOpenInterviewModal(
              cell.row.original.name,
              cell.row.original.email
            )
          }
        >
          Schedule
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      size: 100,
      Cell: ({ cell }) => (
        <>
          <span
            className="link"
            onClick={() =>
              handleOpenHiringModal(
                cell.row.original.aadharNo,
                cell.row.original.email
              )
            }
          >
            Hire&nbsp;|&nbsp;
          </span>
          <span
            className="link"
            onClick={() =>
              handleOpenRejectModal(cell.row.original.aadharNo, data.jobTitle)
            }
          >
            Reject
          </span>
        </>
      ),
    },
  ];

  const baseConfig = useTableConfig(jobApplications, columns, loading);
  const table = useMaterialReactTable({
    ...baseConfig,
  });

  return (
    <Grid container className="profile-container">
      <Grid size={6}>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemText primary="Job Title" />
            <ListItemText secondary={data?.jobTitle} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Job Posting Date" />
            <ListItemText
              secondary={new Date(data?.jobPostingDate).toLocaleDateString()}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Application Deadline" />
            <ListItemText
              secondary={new Date(
                data?.applicationDeadline
              ).toLocaleDateString()}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Job Description" />
            <ListItemText secondary={data?.jobDescription} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Required Skills" />
            <ListItemText secondary={data?.requiredSkills} />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText primary="Number of Vacancies" />
            <ListItemText secondary={data?.numberOfVacancies} />
          </ListItem>
        </List>
      </Grid>
      <Grid size={6}>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemText primary="Candidates Hired" />
            <ListItemText secondary={data?.candidatesHired} />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText primary="Required Experience" />
            <ListItemText secondary={data?.experience} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Location" />
            <ListItemText secondary={data?.location} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Budget" />
            <ListItemText
              secondary={`${data?.budget[0]} LPA - ${data?.budget[1]} LPA`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Hiring Manager" />
            <ListItemText secondary={data?.hiringManager} />
          </ListItem>
        </List>
      </Grid>

      <div style={{ width: "100%" }}>
        <br />
        <h3>Applications</h3>
        <br />
        <MaterialReactTable table={table} />
      </div>

      <ScheduleInterviewModal
        open={openInterviewModal}
        handleClose={handleCloseInterviewModal}
        jobTitle={data?.jobTitle}
        name={name}
        email={email}
      />

      <HiringModal
        open={openHiringModal}
        handleClose={handleCloseHiringModal}
        jobTitle={data?.jobTitle}
        aadharNo={aadharNo}
        getJobApplications={getJobApplications}
        email={email}
      />

      <RejectModal
        open={openRejectModal}
        handleClose={handleCloseRejectModal}
        jobTitle={data?.jobTitle}
        aadharNo={aadharNo}
        getJobApplications={getJobApplications}
      />
    </Grid>
  );
}

export default React.memo(ViewIndividualJob);
