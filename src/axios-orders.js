import axios from "axios";
const instance = axios.create({
  baseURL: "https://burger-app-f4763.firebaseio.com/",
});
export default instance;
