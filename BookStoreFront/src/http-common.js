import axios from "axios";

//const baseURLApp = "https://book-depot.onrender.com";
const baseURLApp = "http://localhost:3000";

const axios_obj = axios.create({
  baseURL: baseURLApp,
  headers: {
    "content-type": "application/json",
  },
});

export { baseURLApp, axios_obj };
