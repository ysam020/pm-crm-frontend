import React from "react";
import ReactApexChart from "react-apexcharts";
import apiClient from "../../config/axiosConfig";

const JoiningInfo = (props) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const res = await apiClient(`/get-joining-data`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  // Extract dates and counts for chart
  const labels = data.map((item) => item.formattedDate);
  const seriesData = data.map((item) => item.count);

  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Employee Joinings in Last Year",
      align: "left",
      style: {
        fontSize: "20px",
        color: props.theme === "dark" ? "#fff" : "#000",
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: props.theme === "dark" ? "#fff" : "#000",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: props.theme === "dark" ? "#fff" : "#000",
          fontSize: "12px",
        },
      },
      title: {
        text: "Joinings Count",
        style: {
          color: props.theme === "dark" ? "#fff" : "#000",
          fontSize: "14px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " joinings"; // Display custom tooltip text
        },
      },
    },
  };

  const series = [
    {
      name: "Joinings",
      data: seriesData,
    },
  ];

  return (
    <div className="dashboard-container">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default JoiningInfo;
