
import { getFunctionUrl, } from "../../config/supabase";

const API = getFunctionUrl('pengajuan');

export const getPengajuan = async () => {
    const response = await fetch(API);
    return response.json();
};

export const getPengajuanById = async (id) => {
    const response = await fetch(`${API}/${id}`);
    return response.json();
};

export const updatePengajuan = async (id, data) => {
    const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const deletePengajuan = async (id) => {
    const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
    });

    return response.json();
};