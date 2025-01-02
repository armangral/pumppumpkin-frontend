import axios from "axios";
import { BASE_URL } from "src/utils/constants";

export async function VerifyUserReferralCode(ReferralCode) {
  try {
    const url =
      ReferralCode &&
      `${BASE_URL}/users/check-referral-code?referral_code=${encodeURIComponent(
        ReferralCode
      )}`;

    const response = await axios.get(
      `${url}`,
      {},
      {
        headers: {},
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle other errors
      throw new Error(
        error.response.data.detail || "Failed to verify Referrral Code!"
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
    }
  }
}


