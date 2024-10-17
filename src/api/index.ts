export const BASE_URL = "https://clever-customer1-76bc92741ea0.herokuapp.com";
// export const BASE_URL = "http://localhost:5001";

export const fetchDataByWeb = async (web: string) => {
  const apiUrl = `${BASE_URL}/getData?web=${encodeURIComponent(web)}`; // Adjust the URL based on your local API

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      throw new Error(`HTTP error! Status`);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
