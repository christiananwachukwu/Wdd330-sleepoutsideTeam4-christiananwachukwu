
export async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "serviceError", message: await res.json() };
  }
}
