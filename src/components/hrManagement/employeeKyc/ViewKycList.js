import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";

function ViewKycList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await apiClient(`/view-all-kycs`);
        setData(res.data);
      } catch (error) {
        console.error("Error occurred while fetching KYC data:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const baseColumns = [
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "middle_name",
      header: "Middle Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "kyc_approval",
      header: "KYC Approval",
    },
  ];

  const columns = getTableColumns(baseColumns);
  const baseConfig = useTableConfig(data, columns, loading);
  const tableBodyProps = {
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/view-kyc/${row.original.username}`),
      style: { cursor: "pointer" },
    }),
  };
  const table = useMaterialReactTable({ ...baseConfig, ...tableBodyProps });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewKycList);
