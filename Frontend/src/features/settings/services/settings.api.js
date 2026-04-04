import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function fetchSettings() {
    const response = await api.get("/api/settings");
    return response.data;
}

export async function updateAccountSettings(payload) {
    const response = await api.patch("/api/settings/account", payload);
    return response.data;
}

export async function updateAppearanceSettings(payload) {
    const response = await api.patch("/api/settings/appearance", payload);
    return response.data;
}

export async function updateNotificationSettings(payload) {
    const response = await api.patch("/api/settings/notifications", payload);
    return response.data;
}

export async function fetchSessions() {
    const response = await api.get("/api/settings/sessions");
    return response.data;
}

export async function deleteAccount() {
    const response = await api.delete("/api/settings/account");
    return response.data;
}

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.post("/api/settings/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
};

