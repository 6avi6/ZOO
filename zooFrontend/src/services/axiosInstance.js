import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8083',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        console.log("Dołączany token:", token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post('http://localhost:8083/api/auth/refresh', null, {
                    withCredentials: true,
                });

                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
