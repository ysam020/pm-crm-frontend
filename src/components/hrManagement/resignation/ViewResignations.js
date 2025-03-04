import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";

function ViewResignations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await apiClient(`/view-resignations`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const baseColumns = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "job_satisfaction",
      header: "Job Satisfaction",
    },
    {
      accessorKey: "support_from_manager",
      header: "Support From Manager",
    },
    {
      accessorKey: "overall_company_culture",
      header: "Overall Company Culture",
    },
    {
      accessorKey: "suggestions",
      header: "Suggestions",
    },
  ];

  const columns = getTableColumns(baseColumns);
  const baseConfig = useTableConfig(data, columns, loading);
  const table = useMaterialReactTable({
    ...baseConfig,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewResignations);
