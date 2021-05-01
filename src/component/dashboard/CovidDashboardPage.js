import React from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import '../../styles/about-page.css';

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'My chart'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6]
    }
  ]
};

// Since this component is simple and static, there's no parent container for it.
class CovidDashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {data: {}};
      }

      componentDidMount() {
          this.getCovidData();
      }

      getCovidData() {
          fetch("http://localhost:8080/covid/india")
                .then(res => res.json())
                .then(
                  (result) => {
                    this.setState({
                      isLoaded: true,
                      data: result
                    });
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    this.setState({
                      isLoaded: false,
                      error
                    });
                  }
                );
      }


    render() {
      const covidData = this.state.data;
      const { error, isLoaded, data } = this.state;
          if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            return (
            <div>
                <h2>Covid-19 Dashboard</h2>
                <HighchartsReact highcharts={Highcharts} options={options} />
              <ul>
                {data.cases_time_series.map(item => (
                            <li key={item.id}>
                              {item.date} {item.dailyconfirmed}
                            </li>
                          ))}
              </ul>
              </div>
            );
          }

    }
}

export default CovidDashboardPage;
