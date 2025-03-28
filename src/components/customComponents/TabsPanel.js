import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../hooks/useTabs";
import ErrorFallback from "./ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function TabsPanel({ tabData, tabKey }) {
  const [value, setValue] = React.useState(
    Number(localStorage.getItem(tabKey)) || 0
  );
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem(tabKey, newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabData.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      <Box>
        {tabData.map((tab, index) => (
          <CustomTabPanel value={value} index={index} key={index}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <ErrorBoundary fallback={<ErrorFallback />}>
                {React.createElement(tab.component)}
              </ErrorBoundary>
            </React.Suspense>
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default React.memo(TabsPanel);
