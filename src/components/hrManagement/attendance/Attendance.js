import TabsPanel from "../../customComponents/TabsPanel";
import * as React from "react";
import LeaveApplication from "./LeaveApplication";
import ViewAttendances from "./ViewAttendances";
import ViewLeaveApplications from "./ViewLeaveApplications";
import WeekOffForm from "./WeekOffForm";
import AttendanceCorrection from "./AttendanceCorrection";
import ViewWeekOffs from "./ViewWeekOffs";
import { UserContext } from "../../../contexts/UserContext";

function Appraisal() {
  const { user } = React.useContext(UserContext);

  const adminTabData = [
    { label: "View All Attendances", component: ViewAttendances },
    { label: "Leave Application", component: LeaveApplication },
    { label: "View Leave Applications", component: ViewLeaveApplications },
    { label: "Week Off", component: WeekOffForm },
    { label: "View Week Offs", component: ViewWeekOffs },
    { label: "Attendance Correction", component: AttendanceCorrection },
  ];

  const userTabData = [
    { label: "Leave Application", component: LeaveApplication },
    { label: "Week Off", component: WeekOffForm },
  ];

  const tabData = user.rank <= 2 ? adminTabData : userTabData;

  return <TabsPanel tabData={tabData} tabKey="attendance_tab_value" />;
}

export default React.memo(Appraisal);
