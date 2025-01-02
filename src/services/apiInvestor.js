import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "src/utils/constants";

export async function getUserTokenSaleSummary() {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/token-sale-summary`,
      {}
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Token Sale Summary!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function BuyTokens(data) {
  try {
    const response = await axios.post(`${BASE_URL}/users/buy-tokens`, data, {});

    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle other errors
      throw new Error(error.response.data.detail || "Failed to buy tokens!");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
    }
  }
}

export async function getInvestorInvestmentSummary(walletAdress) {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/investment-summary/${walletAdress}`,
      {}
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Investment Summary!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function getPPHoldingValue(referralcode) {
  if (!referralcode) {
    window.location.href = "/index";
    throw new Error("Referral code is required");
  }

  try {
    const response = await axios.get(`${BASE_URL}/users/pp-holding-value/`, {
      params: { referral_code: referralcode }, // Pass as query param
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch PPHolding Value!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}
