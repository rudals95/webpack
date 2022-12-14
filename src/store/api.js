import axios from 'axios';

export const API = async (url, post, resData, setResData) => {
  try {
    const res = await axios.post(url, post);
    if (res.status === 200) {
      setResData((state) => ({ ...res.data }));
      return console.log(res.data);
    }
  } catch (err) {
    console.log(err.response);
  }
};
