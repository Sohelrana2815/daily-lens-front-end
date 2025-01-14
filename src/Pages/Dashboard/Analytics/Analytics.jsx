import { useEffect } from "react";
import { Chart } from "react-google-charts";
import "./chart.css";
import useTheme from "../../../Hooks/useTheme";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAllArticlesAnalytics from "../../../Hooks/useAllArticlesAnalytics";
import AnimatedComponent from "../../../Components/AnimatedComponent/AnimatedComponent";
const Analytics = () => {
  const { articles } = useAllArticlesAnalytics();
  const { isDarkMode } = useTheme();
  // Process the data

  const publisherCounts = articles.reduce((acc, article) => {
    const { publisherName } = article; // destructure the publisherName
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

  // PieChartOptions

  // Dynamic PieChartOptions
  const pieChartOptions = {
    title: "Articles by Publisher",
    is3D: window.innerWidth >= 768, // True for md and larger devices
    backgroundColor: isDarkMode ? "#181C14" : "#ffffff", // Tailwind's gray-900 for dark, white otherwise
    titleTextStyle: {
      color: isDarkMode ? "#ffffff" : "#000000", // Adjust title color
    },
    legend: {
      textStyle: {
        color: isDarkMode ? "#ffffff" : "#000000", // Adjust legend text color
      },
    },
  };

  // Update is3D dynamically when resizing the window

  window.addEventListener("resize", () => {
    pieChartOptions.is3D = window.innerWidth >= 768;
  });

  // Usage example
  console.log(pieChartOptions);

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

  const getPublisherData = () => {
    const publisherCounts = articles.reduce((acc, article) => {
      acc[article.publisherName] = (acc[article.publisherName] || 0) + 1;
      return acc;
    }, {});
    const totalArticles = articles.length;
    return Object.keys(publisherCounts).map((publisherName) => [
      publisherName,
      (publisherCounts[publisherName] / totalArticles) * 100,
    ]);
  };

  const data = [["Publisher", "Percentage"], ...getPublisherData()];

  // Material chart options
  const barChartOptions = {
    chart: {
      title: "Articles by Publisher",
      subtitle: "Percentage of total articles by each publisher",
    },
  };

  return (
    <>
      <SectionTitle
        title="Dashboard"
        titleStyle="Overview"
        subTitle="Analyze Publisher Contributions with Insightful Visualizations."
      />
      {/* Pie chart */}
      <AnimatedComponent animation="zoom-in">
        <div className="chart-container">
          <Chart
            chartType="PieChart"
            data={pieChartData}
            options={pieChartOptions}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </AnimatedComponent>
      {/* Bar chart */}
      <AnimatedComponent animation="fade-in">
        <div className="chart-container">
          <Chart
            chartType="Bar"
            data={data}
            options={barChartOptions}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </AnimatedComponent>
    </>
  );
};

export default Analytics;
