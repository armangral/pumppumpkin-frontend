import axios from "axios";
import { BASE_URL } from "src/utils/constants";

export async function getSolPrice() {
  try {
    const response = await axios.get(`${BASE_URL}/admin/sol/price`, {});
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.detail || "Failed to fetch Sol Price!"
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}
