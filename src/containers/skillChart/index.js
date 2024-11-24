// App.jsx
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import "./styles.scss";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

// Custom plugin to draw section labels
const sectionLabelsPlugin = {
  id: "sectionLabels",
  afterDraw(chart) {
    const { ctx, scales } = chart;
    const { r } = scales;

    // Define section labels and their positions
    const labels = [
      { text: "Frontend", angle: Math.PI / 8.5, radius: r.max * 1 }, // 1/3rd of the chart
      { text: "Backend", angle: Math.PI, radius: r.max * 0.7 }, // Center left
      { text: "Database", angle: Math.PI * 1.3, radius: r.max * 0.9 }, // Bottom center
    ];

    // Draw each section label
    labels.forEach(({ text, angle, radius }) => {
      const x = r.xCenter + radius * Math.cos(angle);
      const y = r.yCenter + radius * Math.sin(angle);

      ctx.save();
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(text, x, y);
      ctx.restore();
    });
  },
};

const RadarChart = () => {
  // Define chart data with separate datasets for each section
  const data = {
    labels: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "React-Three-Fiber",
      "Python",
      "Node.js",
      "MongoDB",
    ],
    datasets: [
      {
        label: "Frontend",
        data: [90, 85, 80, 70, 70, 80, 70, 0, 0, 0], // Frontend skill levels
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Light red
        borderColor: "rgba(255, 99, 132, 1)", // Dark red
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Red points
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 400,
      },
      {
        label: "Backend",
        data: [0, 0, 0, 0, 0, 0, 0, 85, 60, 0], // Backend skill levels
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue
        borderColor: "rgba(54, 162, 235, 1)", // Dark blue
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)", // Blue points
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 400,
      },
      {
        label: "Database",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 70], // Database skill levels
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Light green
        borderColor: "rgba(75, 192, 192, 1)", // Dark green
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Green points
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 400,
      },
    ],
  };

  // Define chart options
  const options = {
    scales: {
      r: {
        angleLines: { display: true }, // Display radial lines
        suggestedMin: 0, // Minimum scale value
        suggestedMax: 100, // Maximum scale value
        grid: { color: "#adff2f" }, // Grid color
        pointLabels: {
          color: "#000", // Label text color
          font: { size: 13 }, // Font size
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 400,
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Show legend
        position: "top", // Legend position
        labels: {
          color: "#000", // Legend text color
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 400,
        },
      },
    },
  };

  return (
    <div className="radar-chart-container">
      <Radar data={data} options={options} plugins={[sectionLabelsPlugin]} />
    </div>
  );
};

export default RadarChart;
