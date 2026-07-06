import { useState } from "react";

import { society } from "../API/GetService";
import type { SocietyPayload, SocietyMessage } from "../API/GetService";

export const useCreateSociety = () => {
  const [data, setData] = useState<SocietyMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createSociety = async (
    payload: SocietyPayload,
  ): Promise<SocietyMessage | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await society(payload);
      setData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSociety,
    data,
    isLoading,
    error,
  };
};
