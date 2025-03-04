import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import "../../styles/modules.scss";
import { useNavigate } from "react-router-dom";
import routesConfig from "../../routes/routesConfig.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../hooks/useTabs.js";
import Grid from "@mui/material/Grid2";
import { TabValueContext } from "../../contexts/TabValueContext.js";

function Modules() {
  const { user } = useContext(UserContext);
  const { tabValue, setTabValue } = useContext(TabValueContext);
  const navigate = useNavigate();
  const { a11yProps, CustomTabPanel } = useTabs();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const routes = routesConfig(user);

  // Categorize the user's modules using routes
  const categorizedModules = user?.modules?.reduce((acc, module) => {
    // Find the route config for the module
    const route = routes.find((route) => route.allowedModules.includes(module));
    const category = route ? route.category : "Uncategorized"; // Use category from the route

    if (!acc[category]) acc[category] = [];
    acc[category].push({ name: module, path: route?.path }); // Store both name and path
    return acc;
  }, {});

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Module Categories"
          >
            {/* Generate Tabs dynamically from categorizedModules */}
            {categorizedModules &&
              Object.keys(categorizedModules)
                .sort()
                .map((category, idx) => (
                  <Tab key={idx} label={category} {...a11yProps(idx)} />
                ))}
          </Tabs>
        </Box>

        {/* Generate Tab Panels dynamically from categorizedModules */}
        {categorizedModules &&
          Object.keys(categorizedModules)
            .sort()
            .map((category, idx) => (
              <CustomTabPanel value={tabValue} index={idx} key={idx}>
                <Grid container spacing={2} columnSpacing={3}>
                  {categorizedModules[category]
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort by module name
                    .map(({ name, path }, id) => (
                      <Grid
                        size={{ xs: 12, sm: 4, md: 2 }}
                        key={id}
                        className="module-col"
                      >
                        <div
                          className="module-col-inner"
                          onClick={() => path && navigate(path)} // Navigate using path
                        >
                          <p>{name}</p>
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </CustomTabPanel>
            ))}
      </Box>
    </>
  );
}

export default React.memo(Modules);
