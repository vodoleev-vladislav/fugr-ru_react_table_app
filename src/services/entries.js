import axios from "axios";

export default async (url) => {
  const response = await axios.get(url);
  return response.data;
};
