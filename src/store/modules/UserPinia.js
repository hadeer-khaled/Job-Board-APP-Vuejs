import { defineStore } from 'pinia';
import axiosInstance from '../../axios/index';
import router from '../../router';

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    applications: [],
    error: null,

  }),
  actions: {
    async getUser() {
      try {
        const response = await axiosInstance.get(
          '/user'
        );
        this.user = response.data.user;
        console.log(this.user);
        return response;
        
      } catch (error) {
        console.log("error.",error);
        throw error;
      }
    },
    async empRegister(userData) {
      try {
      
        const response = await axiosInstance.post(
          `/EmpRegister`,
          userData,
        );
        console.log("response", response);
        return response;
      } catch (error) {
        console.log("error",error);
        throw error;
      }
    },
    async candidateRegister(userData) {
      try {
        console.log("user data", userData);
        const response = await axiosInstance.post(
          `/CandidateRegister`,
          userData,
        );
        console.log("response", response);
        return response;
      } catch (error) {
        console.log("error",error);
        throw error;
      }
    },
    async login(userData) {
      try {
        console.log(userData);
        const response = await axiosInstance.post(`/login`, userData);
        localStorage.setItem("token", response.data.token);
        this.user = response.data.user;
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
        
    },
    async logout() {
      localStorage.clear();
      router.push('/');
    },
    async resetUser() {
      this.user = null
      this.applications = []
      this.error = null
    }
   
  },
});
