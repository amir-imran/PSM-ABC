import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { formatDate } from "@fullcalendar/core";

const LineChart = () => {
  let month = String(
    formatDate(new Date(), {
      month: "long",
      year: "numeric",
      day: "numeric",
    })
  ).split(" ")[0];

  return (
    <div className="">
      <Line
        data={{
          labels: [`1 ${month}`, `1 ${month}`, `1 ${month}`, `1 ${month}`],
          datasets: [
            {
              label: "All the Revenue",
              backgroundColor: "rgba(31,41,55,0.2)",
              borderColor: "rgba(31,41,55,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(31,41,55,0.4)",
              hoverBorderColor: "rgba(31,41,55,1)",
              data: [65, 59, 80, 81, 56, 55, 40],
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
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
        height={420}
        width={300}
      />
    </div>
  );
};

export default LineChart;
