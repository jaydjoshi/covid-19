import axios from 'axios';
import { baseUrl} from '../../util/Utils.js'

class CovidService{
    getCountryCovidData(){
        return axios.get(baseUrl+"api/covid/india")
        .then((response) => {
              if (response.data.accessToken) {
                  localStorage.setItem("user", JSON.stringify(response.data));
              }
              var response = response.data;
            },
            (error) => {
              var status = error.response.status
            }
          );
    }
}

export default new CovidService();