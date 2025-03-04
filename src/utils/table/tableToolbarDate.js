import { TextField } from "@mui/material";

export const tableToolbarDate = (date, setDate) => {
  return {
    renderTopToolbarCustomActions: () => (
      <>
        <div>
          <TextField
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="month"
            size="small"
            sx={{ width: "200px", margin: 0, marginRight: "20px" }}
          />
        </div>
      </>
    ),
  };
};
