import React from 'react';
import axios from "axios";

import '../../styles/about-page.css';
import LineChart from '../common/exhibit/LineChart'
import AgGrid from '../common/grid/AgGrid'
import {columns, apiUrl} from '../../util/Utils.js'


const options1 = {
  title: "Cases",
  yLabel: "Count",
  legendEnable: true
};

const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYyMDE0ODYyNCwiZXhwIjoxNjIwMjM1MDI0fQ.5BDll2kw1Bzd1BcjKlSd-3AFe9V3pndiLk1ElMjElMxHvPPhEsfcOYTpFa70uSJbD8gp4g9_YQ0r34CcFGh4ew";

const authAxios = axios.create({
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});


class CovidDashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {data: {}};
      }

      componentDidMount() {
          this.getCovidData();
      }


      getCovidData() {
            console.log("Calling API from: "+ apiUrl);
            authAxios.get(apiUrl+"api/covid/india")
                        .then((response) => {
                        console.log(response);
                          this.setState({
                                                isLoaded: true,
                                                data: response.data
                                              });
                        })
                        .catch((error) => {
                          this.setState({
                                                isLoaded: false,
                                                error
                                              });
                        }
                      );
          /*fetch(baseUrl+"api/covid/india")
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
                );*/
      }


    render() {
      const { error, isLoaded, data } = this.state;
          if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            if(data.cases_time_series !== undefined){
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

            const rowData = data.statewise.filter(item => item.state !== "State Unassigned");
            return (
            <div>
                <h2>Covid-19 Dashboard</h2>

                <div>
                <LineChart data={new Array(optionsRecData)} options={options1} id="Recovered" />
                <LineChart data={new Array(optionsConData)} options={options1} id="Confirmed" />
                <LineChart data={new Array(optionsDesData)} options={options1} id="Deceased" />
                </div>


                <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
                    <AgGrid rowData={rowData} columns={columns} id="AgGrid"></AgGrid>

                </div>
              </div>
            );
            }else{
                return <div>Invalid response...</div>;
            }
          }

    }
}

export default CovidDashboardPage;
