import React, { useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import { tableToolbarDate } from "../../../utils/table/tableToolbarDate";

function ViewOwnWeekOffs(props) {
  useEffect(() => {
    props.getWeekOffs();
    // eslint-disable-next-line
  }, [props.date]);

  const columns = [
    {
      accessorKey: "from",
      header: "Date",
      Cell: ({ cell }) => {
        const dateValue = cell.row.original?.from; // Safely access the 'from' field
        if (typeof dateValue === "string") {
          return <>{dateValue.split("-").reverse().join("-")}</>;
        } else if (dateValue instanceof Date) {
          return <>{dateValue.toLocaleDateString("en-GB")}</>; // Format as dd-mm-yyyy
        } else {
          return <>N/A</>; // Handle undefined or invalid values
        }
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  const baseConfig = useTableConfig(props.data, columns, props.loading);
  const customToolbarActions = tableToolbarDate(props.date, props.setDate);

  const table = useMaterialReactTable({
    ...baseConfig,
    ...customToolbarActions,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewOwnWeekOffs);
