import React, { useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import { tableToolbarDate } from "../../../utils/table/tableToolbarDate";

function ViewOwnLeaves(props) {
  useEffect(() => {
    props.getOwnLeaves();
    // eslint-disable-next-line
  }, [props.date]);

  const baseColumns = [
    {
      accessorKey: "from",
      header: "From",
      Cell: ({ cell }) => {
        const dateValue = cell.row.original?.from;
        if (typeof dateValue === "string") {
          return <>{dateValue.split("-").reverse().join("-")}</>;
        } else if (dateValue instanceof Date) {
          return <>{dateValue.toLocaleDateString("en-GB")}</>;
        } else {
          return <>N/A</>;
        }
      },
    },
    {
      accessorKey: "to",
      header: "To",
      Cell: ({ cell }) => {
        const dateValue = cell.row.original?.to;
        if (typeof dateValue === "string") {
          return <>{dateValue.split("-").reverse().join("-")}</>;
        } else if (dateValue instanceof Date) {
          return <>{dateValue.toLocaleDateString("en-GB")}</>;
        } else {
          return <>N/A</>;
        }
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "sick_leave",
      header: "Sick Leave",
    },
    {
      accessorKey: "medical_certificate",
      header: "Medical Certificate",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  const columns = getTableColumns(baseColumns);
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

export default React.memo(ViewOwnLeaves);
