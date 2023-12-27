export const GetApiCall = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const PostApiCall = async (endpoint: string, data: any) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
export const PutApiCall = async (endpoint: string, data: any) => {
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
export const DeleteApiCall = async (endpoint: string) => {
  const response = await fetch(endpoint, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};
