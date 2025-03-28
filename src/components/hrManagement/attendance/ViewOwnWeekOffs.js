import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import { tableToolbarDate } from "../../../utils/table/tableToolbarDate";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewOwnWeekOffs(props) {
  useEffect(() => {
    props.getWeekOffs();
    // eslint-disable-next-line
  }, [props.date]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "from",
        header: "Date",
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
        accessorKey: "status",
        header: "Status",
      },
    ],
    [] // No dependencies since column definitions are static
  );

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

export default React.memo(ViewOwnWeekOffs);
