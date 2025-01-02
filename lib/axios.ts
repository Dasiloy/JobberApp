import axios from "axios";
import { keys } from "@/config/keys";
import * as SecureStore from "expo-secure-store";
import NetInfo from "@react-native-community/netinfo";

const api = axios.create({
  baseURL: keys.baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      return Promise.reject({ message: "No internet connection" });
    }
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
