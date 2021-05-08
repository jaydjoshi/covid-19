import React from 'react';
import axios from "axios";

import '../../styles/about-page.css';
import LineChart from '../common/exhibit/LineChart'
import AgGrid from '../common/grid/AgGrid'
import {columns} from '../../util/Utils.js'
import {apiUrl} from '../../util/Url.js'
import {optionsConfirmed, optionsRecovered, optionsActive, optionsDeceased} from '../../util/ChartUtils.js'

import authHeader from '../../service/AuthHeader';
import {Link} from "react-router-dom";
import AuthService from "../../service/AuthService";

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
            });
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
                let activeCaseData = [];

                for(let i=0; i< data.cases_time_series.length; i++){
                    var item = data.cases_time_series[i];
                    let dailyrecovered = [];
                    let dailyconfirmed = [];
                    let dailydeceased = [];
                    let dailyactive = [];

                    let epochDate = item.dateInEpoch * 1000;
                    dailyrecovered.push(epochDate);
                    dailyrecovered.push(parseInt(item.dailyrecovered));
                    recoveredCaseData.push(dailyrecovered);

                    dailyconfirmed.push(epochDate);
                    dailyconfirmed.push(parseInt(item.dailyconfirmed));
                    confirmedCaseData.push(dailyconfirmed);

                    dailydeceased.push(epochDate);
                    dailydeceased.push(parseInt(item.dailydeceased));
                    deceasedCaseData.push(dailydeceased);

                    dailyactive.push(epochDate);
                    dailyactive.push(dailyconfirmed[1] - dailyrecovered[1] - dailydeceased[1]);
                    activeCaseData.push(dailyactive);
                }

                let testedData = [];
                let vacinationData = [];
                let previousDayVacinated = 0;
                for(let i=0; i< data.tested.length; i++){
                    var item = data.tested[i];
                    let dailyTested = [];
                    let dailyVacinated = [];

                    let epochDate = item.testedAsOfDateInEpoch * 1000;

                    if(item.dailyrtpcrsamplescollectedicmrapplication !== ""){
                        dailyTested.push(epochDate);
                        dailyTested.push( parseInt(item.dailyrtpcrsamplescollectedicmrapplication));
                        testedData.push(dailyTested);
                    }


                    if(item.firstdoseadministered !== ""){
                        dailyVacinated.push(epochDate);
                        let dailyVacination = parseInt(item.firstdoseadministered) - previousDayVacinated;
                        dailyVacinated.push( dailyVacination);
                        vacinationData.push(dailyVacinated);
                        previousDayVacinated = parseInt(item.firstdoseadministered);
                    }
                }

                const optionsRecData = {name: "Recovered", data: recoveredCaseData, color: "#009688"};
                const optionsConData = {name: "Confirmed", data: confirmedCaseData, color: "#f44336"};
                const optionsDesData = {name: "Deceased", data: deceasedCaseData, color: "#6c757d"};
                const optionsActData = {name: "Active", data: activeCaseData, color: "#3f51b5"};
                const optionsTesData = {name: "Tested", data: testedData, color: "#673ab7"};
                const optionsVacData = {name: "Vacinated", data: vacinationData, color: "#03a9f4"};

                const totalConfirmed = data.cases_time_series[data.cases_time_series.length-1].totalconfirmed;
                const dailyConfirmed = data.cases_time_series[data.cases_time_series.length-1].dailyconfirmed;
                const totalRecovered = data.cases_time_series[data.cases_time_series.length-1].totalrecovered;
                const dailyRecovered = data.cases_time_series[data.cases_time_series.length-1].dailyrecovered;
                const totalDeceased = data.cases_time_series[data.cases_time_series.length-1].totaldeceased;
                const dailyDeceased = data.cases_time_series[data.cases_time_series.length-1].dailydeceased;
                let totalActive = totalConfirmed - totalRecovered - totalDeceased;
                let dailyActive = dailyConfirmed - dailyRecovered - dailyDeceased;

                const rowData = data.statewise.filter(item => item.state !== "State Unassigned");
                const user = JSON.parse(localStorage.getItem("user"));
                const username = user["username"];

            return (
            <div className="row">
                <div className="col-lg-12">
                <br/>
                <div className="row">
                    <div className="col-md-8 sol-sm-12">
                        <nav className="page-header">
                            <h2>Covid-19 Dashboard</h2>
                        </nav>
                    </div>
                    <div className="col text-right">

                        <h6>Welcome, {username} </h6>
                        <Link to='/logout' onClick={() => AuthService.logout()}>logout</Link>
                    </div>
                </div>
                <hr/>

                <br/>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-lg-8 col-md-10">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 text-center is-confirmed">
                                <h4>Confirmed</h4>
                                <div> {totalConfirmed.toLocaleString('en-IN')} </div>
                                <div className="small-text"> + {dailyConfirmed.toLocaleString('en-IN')} </div>
                             </div>
                             <div className="col-lg-3 col-md-6 col-sm-12 text-center is-recovered">
                                 <h4>Recovered</h4>
                                 <div> {totalRecovered.toLocaleString('en-IN')} </div>
                                 <div className="small-text"> + {dailyRecovered.toLocaleString('en-IN')} </div>
                              </div>
                               <div className="col-lg-3 col-md-6 col-sm-12 text-center is-active">
                                   <h4>Active</h4>
                                   <div> {totalActive.toLocaleString('en-IN')} </div>
                                   <div className="small-text"> + {dailyActive.toLocaleString('en-IN')} </div>
                               </div>
                               <div className="col-lg-3 col-md-6 col-sm-12 text-center is-deceased">
                                   <h4>Deceased</h4>
                                   <div> {totalDeceased.toLocaleString('en-IN')} </div>
                                   <div className="small-text"> + {dailyDeceased.toLocaleString('en-IN')} </div>
                               </div>
                           </div>
                       </div>
                       <div className="col"></div>
                 </div>
                 <br/>


                <div className="row">
                    <div className="col"></div>
                    <div className="col-lg-11 col-md-11">
                         <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                   <LineChart data={new Array(optionsConData)} options={optionsConfirmed} id="confirmed" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <LineChart data={new Array(optionsRecData)} options={optionsRecovered} id="recovered" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                  <LineChart data={new Array(optionsActData)} options={optionsActive} id="Active" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <LineChart data={new Array(optionsDesData)} options={optionsDeceased} id="Deceased" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                  <LineChart data={new Array(optionsTesData)} options={optionsActive} id="Tested" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <LineChart data={new Array(optionsVacData)} options={optionsDeceased} id="Vacinated" />
                            </div>
                         </div>
                    </div>
                    <div className="col"></div>
                </div>

                <br/><br/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ag-theme-material" style={{height: 400}}>
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
