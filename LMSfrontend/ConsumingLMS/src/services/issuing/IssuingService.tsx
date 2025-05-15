
import { IssuingTransaction } from "../../types/issuing/Issuing";
import {api} from "../../services/commontokenservice/tokenservice"

export const createTransaction = async (transaction: IssuingTransaction): Promise<void> => {
  // Returning transaction ID as per CreatedAtAction

  console.log("Sending transaction payload:", JSON.stringify(transaction, null, 2));
  try {
    const response = await api.post(`Transactions`, transaction, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from server:", response.data);
  } catch (error) {
    console.error("Error posting transaction:");
    throw error;
  }
};