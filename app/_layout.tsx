import tw from "@/lib/twnrc";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useStore } from "@/store";
import { fonts } from "@/theme/font";
import { useDeviceContext } from "twrnc";
import * as SplashScreen from "expo-splash-screen";
import { queryClient } from "@/lib/react_query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useQueryRefresh } from "@/hooks/use_query_refresh";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import api from "@/lib/axios";
import { User } from "@/classes/user.class";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useDeviceContext(tw);
  useQueryRefresh();

  const [loaded, error] = useFonts({
    [fonts["Poppins-100"]]: require("../assets/fonts/Poppins-Thin.ttf"),
    [fonts["Poppins-200"]]: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    [fonts["Poppins-300"]]: require("../assets/fonts/Poppins-Light.ttf"),
    [fonts["Poppins-400"]]: require("../assets/fonts/Poppins-Regular.ttf"),
    [fonts["Poppins-500"]]: require("../assets/fonts/Poppins-Medium.ttf"),
    [fonts["Poppins-600"]]: require("../assets/fonts/Poppins-SemiBold.ttf"),
    [fonts["Poppins-700"]]: require("../assets/fonts/Poppins-Bold.ttf"),
    [fonts["Poppins-800"]]: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    [fonts["Poppins-900"]]: require("../assets/fonts/Poppins-Black.ttf"),
  });

  const { setUser } = useStore();

  useEffect(() => {
    const fetchUser = async () => {
      console.log(loaded, error);
      if (!loaded || error) return;
      console.log(loaded, error);
      try {
        console.log("Fetching user...");
        const { data } = await api.get("/auth/me");
        console.log(data);
        const user: any = User.GetDataFromQuery(data);
        setUser(User.CreateInstance(user));
      } catch (error) {
        console.log(error);
        console.log("Failed to fetch user", error, Platform.OS);
        setUser(null);
      } finally {
        SplashScreen.hideAsync();
      }
    };
    fetchUser();
  }, [loaded, error]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={tw`flex-1`}>
          <BottomSheetModalProvider>
            <Slot />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
