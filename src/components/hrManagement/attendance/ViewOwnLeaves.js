import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import { tableToolbarDate } from "../../../utils/table/tableToolbarDate";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewOwnLeaves(props) {
  useEffect(() => {
    props.getOwnLeaves();
    // eslint-disable-next-line
  }, [props.date]);

  const baseColumns = useMemo(
    () => [
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
      { accessorKey: "reason", header: "Reason" },
      { accessorKey: "sick_leave", header: "Sick Leave" },
      { accessorKey: "medical_certificate", header: "Medical Certificate" },
      { accessorKey: "status", header: "Status" },
    ],
    []
  );

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);

  const memoizedData = useMemo(() => props.data, [props.data]);

  const baseConfig = useTableConfig(memoizedData, columns, props.loading);

  const customToolbarActions = tableToolbarDate(props.date, props.setDate);

  const table = useMaterialReactTable({
    ...baseConfig,
    ...customToolbarActions,
  });

  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <MaterialReactTable table={table} />
      </ErrorBoundary>
    </div>
  );
}

export default React.memo(ViewOwnLeaves);
