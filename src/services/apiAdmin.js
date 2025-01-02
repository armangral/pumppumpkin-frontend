import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "src/utils/constants";

export async function ApproveReferral(userId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.post(
      `${BASE_URL}/admin/approve_user/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to the /admin/signin page when 401 status is encountered
        toast.error(error.message);
        window.location.href = "/admin/signin";
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

export async function RejectReferral(userId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.post(
      `${BASE_URL}/admin/reject_user/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to the /admin/signin page when 401 status is encountered
        toast.error(error.message);
        window.location.href = "/admin/signin";
      } else {
        // Handle other errors
        throw new Error(
          error.response.data.detail || "Failed to reject Referral"
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

export async function getAdminReferrals() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/admin/vip-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.vip_users;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to fetch Vips!");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function CreateStage(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.post(
      `${BASE_URL}/admin/token-sale-stage`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to the /admin/signin page when 401 status is encountered
        toast.error(error.message);
        window.location.href = "/admin/signin";
      } else {
        // Handle other errors
        throw new Error(
          error.response.data.detail || "Failed to create Stage!"
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

export async function getStages() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/admin/stages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || "Failed to fetch Stages!");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function getAdminTransactions() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/admin/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Transactions!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function getAdminWithdrawalRequests() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/admin/withdrawals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Withdrawal Requests!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function ProcessWithdrawalRequest(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const { withdrawalId, action } = data;

    const senddata = {
      action,
    };

    const response = await axios.put(
      `${BASE_URL}/admin/withdrawals/${withdrawalId}`,
      senddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to the /admin/signin page when 401 status is encountered
        toast.error(error.message);
        window.location.href = "/admin/signin";
      } else {
        // Handle other errors
        throw new Error(
          error.response.data.detail || "Failed to process Withdrawal Request"
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

export async function getAdminTotalSales() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token Found in Local Storage!");
    }

    const response = await axios.get(`${BASE_URL}/admin/total-sales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Total Sales!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}
