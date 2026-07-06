import {
  createResident,
  type ResidentPayload,
  type ResidentMessage,
} from "../API/GetService";

export const useCreateResident = () => {
  // Directly returns the Promise so the component calling it handles the async/await and try/catch block
  const handleCreateResident = (
    data: ResidentPayload,
  ): Promise<ResidentMessage> => {
    return createResident(data);
  };

  return { handleCreateResident };
};
