import { api } from "./axios";

// ==========================================
// 1. LOGIN TYPES & FUNCTION
// ==========================================
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export const adminLogin = async (
  data: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", data);
  console.log("Login response:", response.data);
  return response.data;
};

// ==========================================
// 2. FORGOT PASSWORD TYPES & FUNCTION
// ==========================================
export type ForgetPayload = {
  email: string;
};

export type ForgetMessage = {
  message: string;
  token: string;
};

export const forgetPass = async (
  data: ForgetPayload,
): Promise<ForgetMessage> => {
  const response = await api.post<ForgetMessage>("/forgot-password", data);
  console.log("Forgot Password response:", response.data);
  return response.data;
};

// ==========================================
// 3. RESET PASSWORD TYPES & FUNCTION
// ==========================================
export type ResetPayload = {
  password: string;
};

export type ResetMessage = {
  message: string;
};

export const resetPassword = async (
  token: string,
  data: ResetPayload,
): Promise<ResetMessage> => {
  try {
    const response = await api.post<ResetMessage>(
      `/reset-password/${token}`,
      data,
    );
    console.log("Reset Password response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Reset Password error: ", error);
    throw error; // Re-throwing ensures your UI hook can catch it
  }
};

// ==========================================
// 4. SOCIETY TYPES & FUNCTIONS
// ==========================================
export type SocietyPayload = {
  name?: string;
  registrationNumber?: string;
  societyType?: string;
  address?: string;
  city?: string;
  country?: string;
  subscriptionPlan?: string;
  adminName?: string;
  adminEmail?: string;
  adminPhone?: string;
};
export type SocietyMessage = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    registrationNumber: string;
    societyType: string;
    address: string;
    city: string;
    country: string;
    subscriptionPlan: string;
    status: string;
    admin: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
    };
  };
};

export const society = async (
  data: SocietyPayload,
): Promise<SocietyMessage> => {
  try {
    const response = await api.post<SocietyMessage>("/society", data);
    console.log("Society Create response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Society Create error:", error);
    throw error;
  }
};

export const getSocieties = async () => {
  try {
    const res = await api.get("/societies");
    console.log("Society ", res.data);
    return res.data;
  } catch (error) {
    console.error("get", error);
  }
};

// ==========================================
// 5. ANNOUNCEMENT TYPES & FUNCTION

// ==========================================
export type AnnouncementPayload = {
  title: string;
  description: string;
  category: "Maintenance" | "Event" | "Meeting" | "General Notice";
  priority: "Low" | "Medium" | "High" | "Critical";
  sendTo: string[];
  societies: string[];
  publishDate?: string;
  expiryDate?: string;
  isPinned: boolean;
  attachmentUrl?: string;
  status: "Draft" | "Published";
  createdBy: string;
};
export type AnnouncementMessage = {
  success: boolean;
  message: string;
  data: AnnouncementPayload & {
    _id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
export const createAnnouncement = async (
  data: AnnouncementPayload,
): Promise<AnnouncementMessage> => {
  const response = await api.post<AnnouncementMessage>("/announcement", data);

  return response.data;
};

export const getAnnounce = async () => {
  const response = await api.get("/announcements");
  return response.data;
};
export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async (data: ChangePasswordPayload) => {
  try {
    const res = await api.patch("/change-password", data);
    return res.data;
  } catch (error) {
    console.error("Change Password Error:", error);
    throw error;
  }
};

export const deleteAnnouncement = async (id: string) => {
  const res = await api.delete(`/delete/${id}`);
  return res.data;
};

export const deleteScoiety = async (id: string) => {
  const res = await api.patch(`/society/delete/${id}`);
  return res.data;
};
export const deleteBuilding = async (id: string) => {
  const res = await api.patch(`/building/delete/${id}`);
  return res.data;
};

export const deleteResident = async (id: string) => {
  const res = await api.patch(`/delete/resident/${id}`);
  return res.data;
};

export type updatePayload = Partial<AnnouncementPayload>;

export const updateAnnouce = async (id: string, data: updatePayload) => {
  const res = await api.patch(`/update/announcement/${id}`, data);
  return res.data;
};

export type updateSociety = Partial<SocietyPayload>;

export const updateSocieties = async (id: string, data: updateSociety) => {
  try {
    const res = await api.patch(`/update/society/${id}`, data);
    console.log("Society Update Response:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Society Update Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export type updateResident = Partial<ResidentPayload>;
export const updateResidents = async (id: string, data: updateResident) => {
  const res = await api.patch(`/update/resident/${id}`, data);
  console.log("get", data);
  return res.data;
};

export type updateBuilding = Partial<BuildingPayload>;
export const updateBuildings = async (id: string, data: updateBuilding) => {
  const res = await api.patch(`/update/building/${id}`, data);
  return res.data;
};

export const updateProfile = async (data: {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}) => {
  const res = await api.patch("/profile/update", data);
  return res.data;
};

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    // console.log("get", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

interface Loginpayload {
  email: string;
  password: string;
  role: string;
}

export const userLogin = async (data: Loginpayload) => {
  const response = await api.post("/society/login", data);
  return response.data;
};

export const societyAdmin = async () => {
  try {
    const response = await api.get("/society/profile");

    return response.data;
  } catch (error) {
    console.error("Failed ", error);

    throw error;
  }
};

interface BuildingPayload {
  societyId: string;
  name: string;
  towerCode: string;
  totalFloors: number;
  totalFlats: number;
  flatType: string;
  location: string;
}

export const createBuilding = async (data: BuildingPayload) => {
  const res = await api.post("/create/building", data);

  return res.data;
};

export const getBuilding = async () => {
  const res = await api.get("/building");
  return res.data;
};

export const getResident = async () => {
  try {
    const res = await api.get("/resident");
    console.log("res", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching residents:", error);
    throw error;
  }
};
export interface ResidentPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  societyId: string;
  buildingId: string;
  unit: string;
  role: "owner" | "tenant"; // Changed from optional to required to match backend requirements
  status?: "Active" | "Inactive"; // Optional if backend handles the default fallback
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface ResidentMessage {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  societyId: string;
  buildingId: string;
  unit: string;
  role: "owner" | "tenant";
  status: "Active" | "Inactive";
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ResidentResponse {
  success: boolean;
  message: string;
  data: ResidentMessage;
}

export const createResident = async (
  data: ResidentPayload,
): Promise<ResidentMessage> => {
  const response = await api.post<ResidentResponse>("/create/resident", data);

  return response.data.data;
};
