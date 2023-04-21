import axios from "axios";

export default axios.create({
  baseURL: "https://sheets.googleapis.com/v4/spreadsheets",
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.REACT_APP_GOOGLE_API_KEY
  }
});