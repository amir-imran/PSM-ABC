import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
const PieChart = ({ data }) => {
  return (
    <div className=" border">
      <Pie
        data={{
          labels: ["Income", "Expense"],
          datasets: [
            {
              label: "All the Revenue",
              backgroundColor: [
                // "vertical-align: middle",
                "rgba(60, 179, 113,0.5)",
                "rgba(0,0,255,0.5)",
              ],
              borderColor: "rgba(31,41,55,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(31,41,55,0.4)",
              hoverBorderColor: "rgba(31,41,55,1)",
              data: data,
              fill: {
                target: "origin",
                // above: 'rgb(255, 0, 0)',   // Area will be red above the origin
                below: "rgb(0, 0, 255)", // And blue below the origin
              },
              tension: 0.2,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
          },
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default PieChart;
