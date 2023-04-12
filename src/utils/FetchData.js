export async function callAPI(url = "", methode, data = {}) {
  const options = {
    method: methode,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (methode !== "GET") options.body = { body: JSON.stringify(data) };
  const response = await fetch(url, options);
  return response.json();
}
