import { API } from "./index";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  image?: File | null;
}

export const signup = async (data: SignupPayload) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);

  if (data.image) {
    formData.append("file", data.image); 
  }

  const res = await fetch(API.signup, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};


export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (data: LoginPayload) => {
  const res = await fetch(API.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json(); // { user, token }
};
