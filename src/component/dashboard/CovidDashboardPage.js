import React from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import '../../styles/about-page.css';
import LineChart from '../common/exhibit/LineChart'

const options1Data = [
  {
    name: "Recovered",

  }
];
const options1 = {
  title: "Cases",
  yLabel: "Count",
  legendEnable: true
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
            let recoveredCaseData = [];
            let confirmedCaseData = [];
            let deceasedCaseData = [];
            for(let i=0; i< data.cases_time_series.length; i++){
                var item = data.cases_time_series[i];
                let dailyrecovered = [];
                let dailyconfirmed = [];
                let dailydeceased = [];

                dailyrecovered.push(item.date);
                dailyrecovered.push(parseInt(item.dailyrecovered));
                recoveredCaseData.push(dailyrecovered);

                dailyconfirmed.push(item.date);
                dailyconfirmed.push(parseInt(item.dailyconfirmed));
                confirmedCaseData.push(dailyconfirmed);

                dailydeceased.push(item.date);
                dailydeceased.push(parseInt(item.dailydeceased));
                deceasedCaseData.push(dailydeceased);
            }
            const optionsRecData = {name: "Recovered", data: recoveredCaseData};
            const optionsConData = {name: "Confirmed", data: confirmedCaseData};
            const optionsDesData = {name: "Deceased", data: deceasedCaseData};

            return (
            <div>
                <h2>Covid-19 Dashboard</h2>
                {/*<HighchartsReact highcharts={Highcharts} options={options} />*/}
                <LineChart data={new Array(optionsRecData)} options={options1} id="Recovered" />
                <LineChart data={new Array(optionsConData)} options={options1} id="Confirmed" />
                <LineChart data={new Array(optionsDesData)} options={options1} id="Deceased" />

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
