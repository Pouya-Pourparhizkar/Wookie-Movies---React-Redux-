import axios from "axios";

export default axios.create({
  baseURL: `https://wookie.codesubmit.io`,
  headers: {
    Authorization: "Bearer Wookie2019",
  },
});
