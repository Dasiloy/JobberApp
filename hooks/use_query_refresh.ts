import { useEffect } from "react";
import { AppState } from "react-native";
import { onAppStateChange } from "@/lib/react_query";

export const useQueryRefresh = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);
};
