import React from "react";
import PropTypes from "prop-types";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartOptions from "./LineChartMd";

import '../../../styles/chart.css';

const LineChart = props => {
  const { data, options, id } = props;
  let highchartsOptions;

  if (Object.keys(options).length) {
    highchartsOptions = {
      ...ChartOptions,
      series: data,
      title: { ...ChartOptions.title, text: options.title },
      yAxis: { ...ChartOptions.yAxis, title: { text: options.yLabel } },
      legend: { ...ChartOptions.legend, enabled: options.legendEnable }
    }
    //highchartsOptions.series[0].options.color = "#008800";
  }

  return (

      <div className="line-chart">
          <HighchartsReact highcharts={Highcharts} options={highchartsOptions} id={id} />
      </div>


  );
};

LineChart.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object,
  id: PropTypes.string
};

LineChart.defaultProps = {
  data: [],
  options: {},
  id: ""
};

export default LineChart;