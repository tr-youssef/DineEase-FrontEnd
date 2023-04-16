export async function callAPI(url = "", methode = "GET", data = {}, token = "") {
  const options = {
    method: methode,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  if (methode !== "GET") options.body = JSON.stringify(data);
  const response = await fetch(url, options);
  return response.json();
}
