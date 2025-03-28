import React, { useContext, useMemo } from "react";
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

  const routes = useMemo(() => routesConfig(user), [user]);

  // Categorize the user's modules using routes (Memoized)
  const categorizedModules = useMemo(() => {
    return user?.modules?.reduce((acc, module) => {
      const route = routes.find((route) =>
        route.allowedModules.includes(module)
      );
      const category = route ? route.category : "Uncategorized";

      if (!acc[category]) acc[category] = [];
      acc[category].push({ name: module, path: route?.path });
      return acc;
    }, {});
  }, [user?.modules, routes]);

  // Generate sorted tab categories (Memoized)
  const sortedCategories = useMemo(
    () => (categorizedModules ? Object.keys(categorizedModules).sort() : []),
    [categorizedModules]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="Module Categories"
        >
          {sortedCategories.map((category, idx) => (
            <Tab key={idx} label={category} {...a11yProps(idx)} />
          ))}
        </Tabs>
      </Box>

      {sortedCategories.map((category, idx) => (
        <CustomTabPanel value={tabValue} index={idx} key={idx}>
          <Grid container spacing={2} columnSpacing={3}>
            {categorizedModules[category]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, path }, id) => (
                <Grid
                  size={{ xs: 12, sm: 4, md: 2 }}
                  key={id}
                  className="module-col"
                >
                  <div
                    className="module-col-inner"
                    onClick={() => path && navigate(path)}
                  >
                    <p>{name}</p>
                  </div>
                </Grid>
              ))}
          </Grid>
        </CustomTabPanel>
      ))}
    </Box>
  );
}

export default React.memo(Modules);
