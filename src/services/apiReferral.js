import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "src/utils/constants";

export async function getVipsReferralTransactions(numDays) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/users/vips/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        date_range: numDays === "all" ? "all" : `${numDays}days`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to the /admin/signin page when 401 status is encountered
        toast.error(error.message);
        window.location.href = "/signin";
      } else {
        // Handle other errors
        throw new Error(
          error.response.data.detail || "Failed to approve Referral"
        );
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
    }
  }
}

export async function getVipsReferralCode() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/users/vips/referalcode`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Referral Code!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function getVipsEarningSummary() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/users/vips/earnings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Earnings Summary!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function getVipBalance() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/users/vips/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to fetch Balance!");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function WithdrawVipBalance(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.post(`${BASE_URL}/users/vips/withdraw`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to withdraw Balance!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}
