import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { BASE_URL } from "src/utils/constants";

const UserDashboardChart = ({ value }) => {
  const [selectedFilter, setSelectedFilter] = useState("day");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch chart data from API
  const fetchChartData = async (filter) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await fetch(
        `${BASE_URL}/users/pp-holding-value-chart/?time_period=${filter}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.values || !Array.isArray(data.values)) {
        throw new Error("Invalid data format from API");
      }

      setChartData(data.values);
    } catch (error) {
      setError(error.message);
      setChartData([]); // Reset chart data on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever the selected filter changes
  useEffect(() => {
    fetchChartData(selectedFilter);
  }, [selectedFilter]);

  // Chart configuration
  const chartOptions = {
    chart: {
      id: "line-chart",
      toolbar: { show: false },
      background: "transparent",
    },
    xaxis: {
      categories: chartData.length
        ? chartData.map((item) => new Date(item.timestamp).toLocaleString())
        : [],
    },
    stroke: { curve: "smooth", width: 3 },
    theme: { mode: "dark" },
    grid: { show: false },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#243124"],
        stops: [0, 100],
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },
    dataLabels: { enabled: false },
    tooltip: { theme: "dark" },
  };

  const chartSeries = [
    {
      name: "Holding Value (USD)",
      data: chartData.length
        ? chartData.map((item) => item.holding_value_usd || 0)
        : [],
    },
  ];

  return (
    <div className="col-span-3 text-grey rounded-lg lg:rounded-xl bg-[#171717] p-2 lg:p-4">
      <div className="flex lg:flex-row flex-col justify-between items-center mb-4 gap-y-4">
        <h2 className="text-2xl font-semibold">
          PP Value{" "}
          <span className="font-light">(Based on Current Selling Price)</span>
        </h2>
        <div className="flex flex-row gap-x-4">
          {["day", "week", "month", "year"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2 py-2 rounded ${
                selectedFilter === filter ? "text-primary" : "text-grey"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="text-center text-red-500 mb-4">Error: {error}</div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-grey">Loading...</div>
      ) : chartData.length > 0 ? (
        <>
          {/* Display the last data point's value */}
          <div className="lg:text-4xl text-3xl font-bold mb-4">$ {value}</div>
          {/* Display the chart */}
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={300}
          />
        </>
      ) : (
        // No Data State
        <div className="text-center text-grey">
          No data available for this time period.
        </div>
      )}
    </div>
  );
};

export default UserDashboardChart;
