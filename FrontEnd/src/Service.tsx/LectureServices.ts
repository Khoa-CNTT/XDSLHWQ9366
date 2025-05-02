import axios from "axios";

const url="http://localhost:8080/api/";
export  const getAllLinhVuc =  () => axios.get(`${url}/linhvuc/linhvucs`);
export const createLinhVuc = (linhvuc) => axios.post(`${url}/linhvuc/linhvuc`, linhvuc);
export const getLinhVuc = (linhvucId) => axios.get(`${url}/linhvuc/linhvuc/` + linhvucId);
export const updateLinhVuc = (linhvucId) => axios.put(`${url}/linhvuc/linhvuc`, linhvucId);
export const deleteLinhVuc = (linhvucId) => axios.delete(`${url}/linhvuc/linhvuc/${linhvucId}`);