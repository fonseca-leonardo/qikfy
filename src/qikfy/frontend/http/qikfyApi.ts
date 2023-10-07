import axios from "axios";

const qikfyApi = axios.create({
  baseURL: "/qikfy/api",
});

export default qikfyApi;
