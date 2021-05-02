

export const chartOptions = {
  title: {
    text: "",
    align: "left",
    style: {
      textTransform: "none",
      fontSize: "1.5rem",
      fontWeight: "400",
      fontFamily: "Roboto"
    }
  },
  yAxis: {
    title: {
      text: "",
      style: {
        textTransform: "none"
      }
    }
  },
  xAxis: {
    type: "datetime",
    labels: {
          format: '{value:%Y-%b-%e}'
        },
    gridLineWidth: 1
  },
  legend: {
    layout: "horizontal",
    align: "right",
    verticalAlign: "top",
    floating: true
  },
  series: [],
  credits: {
    enabled: false
  },
  chart: {
    height: "195px",
    backgroundColor: "rgb(29, 37, 53)"
  }
};

export default chartOptions;
