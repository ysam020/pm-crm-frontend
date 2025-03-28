import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import routesConfig from "../../routes/routesConfig";
import { UserContext } from "../../contexts/UserContext";
import apiClient from "../../config/axiosConfig";
import { AlertContext } from "../../contexts/AlertContext";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function AssignModule(props) {
  const [checked, setChecked] = useState([]);
  const [right, setRight] = useState([]);
  const { user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const routes = routesConfig(user);

  const excludedModules = routes
    .filter((route) => !route.canBeAssigned)
    .map((route) => route.name);

  const allModules = routes
    .map((route) => route.name)
    .filter((name) => !excludedModules.includes(name));

  // Fetch modules of selected user
  useEffect(() => {
    async function getUserModules() {
      if (props.selectedUser) {
        try {
          const res = await apiClient(
            `/get-user-modules/${props.selectedUser}`
          );

          setRight(res.data.modules);
          setLeft(
            allModules.filter((module) => !res.data.modules?.includes(module))
          );
        } catch (error) {
          console.error("Error occurred while fetching user modules:", error);
        }
      } else {
        setLeft([]);
        setRight([]);
      }
    }

    getUserModules();
    // eslint-disable-next-line
  }, [props.selectedUser]);

  const unAssignedModules = allModules
    .sort()
    .filter((module) => right?.includes(module));
  const [left, setLeft] = useState(unAssignedModules);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => async () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items)?.length;

  const handleToggleAll = (items) => () => {
    if (items.length === 0) {
      return;
    }

    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleAssignModule = async () => {
    const newRight = right.concat(leftChecked).sort();
    const newLeft = not(left, leftChecked).sort();
    setRight(newRight);
    setLeft(newLeft);
    setChecked(not(checked, leftChecked));
    try {
      await apiClient.put(`/assign-modules`, {
        modules: leftChecked,
        username: props.selectedUser,
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

  const handleUnassignModule = async () => {
    const newLeft = left.concat(rightChecked).sort();
    const newRight = not(right, rightChecked).sort();
    setLeft(newLeft);
    setRight(newRight);
    setChecked(not(checked, rightChecked));
    try {
      await apiClient.put(`/unassign-modules`, {
        modules: rightChecked,
        username: props.selectedUser,
      });
    } catch (error) {
      console.error("Error occurred while unassigning modules:", error);
    }
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items?.length && items?.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items?.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items?.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items?.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 400,
          height: 550,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items?.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  sx={{ color: "#000" }}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList("Available Modules", left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAssignModule}
              disabled={leftChecked?.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleUnassignModule}
              disabled={rightChecked?.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList("Assigned Modules", right)}</Grid>
      </Grid>
    </div>
  );
}

export default React.memo(AssignModule);
