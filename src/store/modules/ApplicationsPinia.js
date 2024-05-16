import { defineStore } from 'pinia';
import axiosInstance from '../../axios/index';


export const useApplicationsStore = defineStore({
    id: "applications",
    state: () => ({
        applications: [],
        error: null,
    }),
    actions: {
        async fetchCandidateApplications() {
            try {
                const result = await axiosInstance
                .get('/candidates/applications');
                this.applications = result.data.data;
                return result;
            }
            catch(error) {
                console.log(error);
            }
        },
        async removeApplication(app_id){
            try {
                await axiosInstance.delete('/applications', {
                    data: {
                        app_id
                    }
                });
                
                const newApplications = this.applications.filter(application => application.id != app_id);
                this.applications = [...newApplications];
                
                return true;
            } catch (err) {
                return false;
            }
        }
    },
});
