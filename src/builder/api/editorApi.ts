import axios from "axios";

const editorApi = axios.create({
  baseURL: "/api/editor",
});

export default editorApi;
