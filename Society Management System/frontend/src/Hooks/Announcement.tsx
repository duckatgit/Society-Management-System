import { useState } from "react";
import {
  type AnnouncementPayload,
  type AnnouncementMessage,
} from "../API/GetService";
import { createAnnouncement } from "../API/GetService";
import { toast } from "react-toastify";

export const useAnnouncement = () => {
  const [data, setData] = useState<AnnouncementMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAnnouncement = async (
    payload: AnnouncementPayload,
  ): Promise<AnnouncementMessage | null> => {
    setIsLoading(true);
    try {
      const response = await createAnnouncement(payload);
      setData(response);
      return response;
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || "Failed to create announcement";
      toast.error(serverMessage);
      console.error("Announcement Error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createAnnouncement: handleCreateAnnouncement,
    isLoading,
    data,
  };
};
