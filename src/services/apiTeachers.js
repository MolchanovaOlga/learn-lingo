import axios from "axios";

export const BASE_URL = "https://learnlingo-24c98-default-rtdb.firebaseio.com";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const getAllTeachers = async () => {
  try {
    const results = await instance.get("/teachers.json");

    return results.data;
  } catch (er) {
    console.log(er);
  }
};

export const getTeachersForPaginations = async (lastKey) => {
  try {
    const params = !lastKey
      ? `?orderBy="$key"&limitToFirst=4`
      : `?orderBy="$key"&&startAt="${lastKey}"&limitToFirst=4`;

    const results = await instance.get(`/teachers.json${params}`);

    return results.data;
  } catch (er) {
    console.log(er);
  }
};

export const getFilteredTeachersByPrice = async (price) => {
  try {
    if (price) {
      let params = "?limitToFirst=4";
      params += `&orderBy="price_per_hour"&equalTo=${Number(price.value)}`;

      const results = await instance.get(`/teachers.json${params}`);
      return results.data;
    }
  } catch (err) {
    console.log(err);
  }
};
