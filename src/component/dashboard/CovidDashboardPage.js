import React from 'react';
import axios from "axios";

import '../../styles/about-page.css';
import LineChart from '../common/exhibit/LineChart'
import AgGrid from '../common/grid/AgGrid'
import {columns} from '../../util/Utils.js'
import {apiUrl} from '../../util/Url.js'

import authHeader from '../../service/AuthHeader';

const options1 = {
  title: "Cases",
  yLabel: "Count",
  legendEnable: true
};

const accessToken = authHeader();

const authAxios = axios.create({
    headers: {
        Authorization: accessToken
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
            <div className="row">
                <div className="col-lg-12">

                <div className="page-header">
                    <h2>Covid-19 Dashboard</h2> <hr/>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <p>Confirmed</p>
                        <span> {data.cases_time_series[data.cases_time_series.length-1].totalconfirmed} </span>
                        <span> {data.cases_time_series[data.cases_time_series.length-1].dailyconfirmed} </span>
                     </div>
                     <div className="col-lg-4 col-md-6 col-sm-12">
                         <p>Recovered</p>
                         <span> {data.cases_time_series[data.cases_time_series.length-1].totalrecovered} </span>
                         <span> {data.cases_time_series[data.cases_time_series.length-1].dailyrecovered} </span>
                      </div>
                       <div className="col-lg-4 col-md-6 col-sm-12">
                           <p>Deceased</p>
                           <span> {data.cases_time_series[data.cases_time_series.length-1].totaldeceased} </span>
                           <span> {data.cases_time_series[data.cases_time_series.length-1].dailydeceased} </span>
                       </div>
                 </div>


                <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                       <LineChart data={new Array(optionsConData)} options={options1} id="confirmed" />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <LineChart data={new Array(optionsRecData)} options={options1} id="recovered" />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <LineChart data={new Array(optionsDesData)} options={options1} id="Deceased" />
                </div>
                </div>

                <br/><br/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ag-theme-alpine" style={{height: 400}}>
                            <AgGrid rowData={rowData} columns={columns} id="AgGrid"></AgGrid>
                        </div>
                    </div>
                </div>

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
