import axios from "axios";

const BASE_URL = "http://localhost:8080/baiviet";

export const getAllBaiViet = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data.data;
};
