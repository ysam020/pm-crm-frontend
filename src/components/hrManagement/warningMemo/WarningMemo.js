import React from "react";
import TabsPanel from "../../customComponents/TabsPanel";
const WarningMemoForm = React.lazy(() => import("./WarningMemoForm"));
const ViewWarningMemos = React.lazy(() => import("./ViewWarningMemos"));

function Appraisal() {
  const tabData = [
    { label: "Warning Memo Form", component: WarningMemoForm },
    { label: "View Warning Memos", component: ViewWarningMemos },
  ];

  return <TabsPanel tabData={tabData} tabKey="warning_memo_tab_value" />;
}

export default React.memo(Appraisal);
