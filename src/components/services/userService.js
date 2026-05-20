import { api } from "../api/axios";

export const getAllUsersAPi = async () => {
    return await api.get("/admin/users",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }   
    }); 
}

export const getUserByIdAPi = async (id) => {
    return await api.get(`/admin/users/${id}`); 
}

export const createUserAPi = async (userData) => {

  return await api.post("/admin/users", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUserAPi = async (id, userData) => {
    return await api.put(`/admin/users/${id}`, userData); 
}

export const deleteUserAPi = async (id) => {
    return await api.delete(`/admin/users/${id}`); 
}