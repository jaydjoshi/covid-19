import axios from "axios";
import {apiUrl} from '../util/Url.js'


class AuthService {
  login(username, password) {
    return axios
      .post(apiUrl + "api/auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
            console.log(response.data)
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(apiUrl + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();