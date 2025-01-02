import axios from "axios";
import { BASE_URL } from "src/utils/constants";

export async function signup(data) {
  try {
    const { secret, ...signupData } = data;

    const url =
      secret &&
      `${BASE_URL}/auth/register?secret=${encodeURIComponent(secret)}`;

    const response = await axios.post(`${url}`, signupData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to Signup");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function updateProfile(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.patch(
      `${BASE_URL}/users/updateprofile`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to Update");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function login(data) {
  const { email, password } = data;
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.access_token;
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to log in");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function AdminLogin(data) {
  const { email, password } = data;
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.access_token;
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to log in");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

export async function getCurrentAdmin() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.get(`${BASE_URL}/admin/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current Admin:", error);
    throw error;
  }
}

export async function logoutUser() {
  localStorage.removeItem("token");
}
