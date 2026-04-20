exports.handler = async function (event) {
  const AT_TOKEN = process.env.AT_TOKEN;
  const BASE_ID = process.env.BASE_ID;

  const { path, method, body } = JSON.parse(event.body);
  const url = `https://api.airtable.com/v0/${BASE_ID}/${path}`;

  const res = await fetch(url, {
    method: method || "GET",
    headers: {
      Authorization: `Bearer ${AT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: method !== "GET" ? body : undefined,
  });

  const data = await res.json();

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data),
  };
};
