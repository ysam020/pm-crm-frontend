import React from "react";
import ReactApexChart from "react-apexcharts";
import apiClient from "../../config/axiosConfig";

const EmployeeDepartments = (props) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const res = await apiClient(`/get-age-distribution`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  // Prepare data for the chart
  const labels = data.map((item) => item._id); // Department names
  const seriesData = data.map((item) => item.count); // Department counts

  const chartOptions = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    fill: {
      type: "gradient",
    },
    labels: labels,
    title: {
      text: "Employee Age Distribution",
      align: "left",
      style: {
        fontSize: "20px",
        color: props.theme === "dark" ? "#fff" : "#000",
      },
    },
    legend: {
      position: "right",
      labels: {
        colors: props.theme === "dark" ? "#fff" : "#000",
        useSeriesColors: false,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} employees`,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="donut"
        height={400}
      />
    </div>
  );
};

export default EmployeeDepartments;
