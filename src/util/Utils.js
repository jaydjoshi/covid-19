export const columns = ["state","active","confirmed", "deaths", "recovered"]
export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'https://covid-19-dashboard-rest-api.herokuapp.com/'
