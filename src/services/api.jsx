const BASE_URL = 'http://localhost:8081/api';

export const request = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseText = await res.text();

  if (!res.ok) {
    throw new Error(responseText || 'API request failed');
  }

  return responseText ? JSON.parse(responseText) : null;
};

//Auth
export const loginUser = (data) => request('/auth/login', 'POST', data);
export const registerUser = (data) => request('/auth/register', 'POST', data);

//Products
export const getProducts = (token) => request('/products', 'GET', null, token);
export const getProduct = (id, token) => request(`/products/${id}`, 'GET', null, token);
export const createProduct = (data, token) => request('/products', 'POST', data, token);
export const updateProduct = (id, data, token) => request(`/products/${id}`, 'PUT', data, token);
export const deleteProduct = (id, token) => request(`/products/${id}`, 'DELETE', null, token);

export const getProductsByUser = (userId, token) =>
  request(`/products/user/${userId}`, 'GET', null, token);
