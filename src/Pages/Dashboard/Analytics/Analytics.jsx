import { useEffect } from "react";
import { Chart } from "react-google-charts";
import useAllArticles from "../../../Hooks/useAllArticles";

const ArticlesCharts = () => {
  const { allArticles } = useAllArticles();

  // Process the data
  const publisherCounts = allArticles.reduce((acc, article) => {
    const { publisherName } = article;
    acc[publisherName] = (acc[publisherName] || 0) + 1;
    return acc;
  }, {});

  // Calculate total articles
  const totalArticles = Object.values(publisherCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  // Prepare data for the pie chart
  const pieChartData = [
    ["Publisher", "Percentage"],
    ...Object.entries(publisherCounts).map(([publisher, count]) => [
      publisher,
      (count / totalArticles) * 100,
    ]),
  ];

  const pieChartOptions = {
    title: "Articles by Publisher",
    pieHole: 0.4, // Optional: for a donut chart effect
    is3D: false,
  };

  useEffect(() => {
    const makePassive = () => {
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (
        type,
        listener,
        options
      ) {
        if (
          type === "scroll" ||
          type === "mousewheel" ||
          type === "touchstart" ||
          type === "touchmove"
        ) {
          const modifiedOptions = options || {};
          if (typeof modifiedOptions === "object") {
            modifiedOptions.passive = true;
          }
          originalAddEventListener.call(this, type, listener, modifiedOptions);
        } else {
          originalAddEventListener.call(this, type, listener, options);
        }
      };
    };

    makePassive();

    return () => {
      // Clean up modifications if needed
    };
  }, []);

  return (
    <div>
      <div className="chart-container">
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default ArticlesCharts;
