const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
  signup: `${API_BASE_URL}/auth/signup`,
  login: `${API_BASE_URL}/auth/login`,

};
