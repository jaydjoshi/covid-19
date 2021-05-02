import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/about-page.css';
import LineChart from '../common/exhibit/LineChart'
import AgGrid from '../common/grid/AgGrid'
import {columns} from '../../util/Utils.js'

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

            const rowData = data.statewise.filter(item => item.state != "State Unassigned");
            return (
            <div>
                <h2>Covid-19 Dashboard</h2>

                <div>
                <LineChart data={new Array(optionsRecData)} options={options1} id="Recovered" />
                <LineChart data={new Array(optionsConData)} options={options1} id="Confirmed" />
                <LineChart data={new Array(optionsDesData)} options={options1} id="Deceased" />
                </div>


                <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
                    <AgGrid rowData={rowData} columns={columns}></AgGrid>

                </div>
              </div>
            );
          }

    }
}

export default CovidDashboardPage;
