import React, { useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

// Reusable component for rendering a section
function Section({ title, children }) {
  return (
    <div>
      <h5>{title}</h5>
      <div style={{ display: "flex", alignItems: "center" }}>{children}</div>
    </div>
  );
}

// Reusable component for rendering a list of info items
function InfoList({ data }) {
  return (
    <List sx={{ width: "100%" }}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText primary={item.label} />
            {item.link ? (
              <a href={item.link}>
                <ListItemText
                  sx={{ color: "blue !important" }}
                  secondary={item.value}
                />
              </a>
            ) : (
              <ListItemText secondary={item.value} />
            )}
          </ListItem>
          {index < data.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

// Main component
function BasicInfo({ user }) {
  const addressInfo = useMemo(
    () => [
      {
        label: "Communication Address",
        value: [
          user.communication_address_line_1,
          user.communication_address_line_2,
          user.communication_address_city,
          user.communication_address_area,
          user.communication_address_state,
          user.communication_address_pincode,
        ]
          .filter(Boolean)
          .join(", "),
      },
      {
        label: "Permanent Address",
        value: [
          user.permanent_address_line_1,
          user.permanent_address_line_2,
          user.permanent_address_city,
          user.permanent_address_area,
          user.permanent_address_state,
          user.permanent_address_pincode,
        ]
          .filter(Boolean)
          .join(", "),
      },
    ],
    [user]
  );

  const profileInfo = useMemo(
    () => [
      { label: "Username", value: user.username },
      { label: "Name", value: user.full_name },
      { label: "Birth Date", value: user.dob },
      { label: "Blood Group", value: user.blood_group },
    ],
    [user]
  );

  const contactInfo = useMemo(
    () => [
      { label: "Email", value: user.email },
      { label: "Official Email", value: user.official_email },
      { label: "Mobile", value: user.mobile },
    ],
    [user]
  );

  const bankInfo = useMemo(
    () => [
      { label: "Bank Account Number", value: user.bank_account_no },
      { label: "Bank Name", value: user.bank_name },
      { label: "IFSC", value: user.ifsc_code },
    ],
    [user]
  );

  const employmentInfo = useMemo(
    () => [
      { label: "Designation", value: user.designation },
      { label: "Department", value: user.department },
      { label: "Joining Date", value: user.joining_date },
    ],
    [user]
  );

  const documentsInfo = useMemo(
    () => [
      {
        label: "AADHAR Number",
        value: user.aadhar_no,
        link: user.aadhar_photo_front,
      },
      { label: "PAN Number", value: user.pan_no, link: user.pan_photo },
      { label: "PF Number", value: user.pf_no },
      { label: "ESIC Number", value: user.esic_no },
    ],
    [user]
  );

  return (
    <Grid container className="profile-container">
      <Grid size={{ xs: 12, md: 6 }}>
        <Section title="Profile Info">
          <Avatar src={user.employee_photo} style={{ width: 80, height: 80 }} />
          <InfoList data={profileInfo} />
        </Section>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Section title="Contact Info">
          <InfoList data={contactInfo} />
        </Section>
      </Grid>

      <Divider variant="fullWidth" sx={{ opacity: 1 }} />
      <br />

      <Grid size={{ xs: 12, md: 6 }}>
        <Section title="Address Info">
          <InfoList data={addressInfo} />
        </Section>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Section title="Bank Info">
          <InfoList data={bankInfo} />
        </Section>
      </Grid>

      <Divider variant="fullWidth" sx={{ opacity: 1 }} />
      <br />

      <Grid size={{ xs: 12, md: 6 }}>
        <Section title="Employment Info">
          <InfoList data={employmentInfo} />
        </Section>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Section title="Documents">
          <InfoList data={documentsInfo} />
        </Section>
      </Grid>
    </Grid>
  );
}

export default React.memo(BasicInfo);
