

export const chartOptions = {
  title: {
    text: "",
    align: "left",
    style: {
      textTransform: "none",
      fontSize: "1.5rem",
      fontWeight: "500"
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
    type: 'datetime',
    dateTimeLabelFormats: {
        day: "%e-%b-%y",
        month: "%b-%y"
    }
  },
  legend: {
    layout: "horizontal",
    align: "right",
    verticalAlign: "top",
    floating: true
  },
   plotOptions: {
      series: {
          animation: {
               duration: 1000
          }
      }
   },
  series: [],
  credits: {
    enabled: false
  }
};

export default chartOptions;
