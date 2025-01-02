import { QueryClient } from "@tanstack/react-query";
import { AppStateStatus, Platform } from "react-native";
import { focusManager } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Listen for app state changes
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export { queryClient, onAppStateChange };
