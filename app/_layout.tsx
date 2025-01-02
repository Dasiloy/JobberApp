import { useEffect } from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import tw from "@/lib/twnrc";
import { useStore } from "@/store";
import { useDeviceContext } from "twrnc";
import { useUser } from "@/queries/auth/useUser";
import * as SplashScreen from "expo-splash-screen";
import { queryClient } from "@/lib/react_query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useQueryRefresh } from "@/hooks/use_query_refresh";
import { QueryClientProvider } from "@tanstack/react-query";
import { User } from "@/classes/user.class";

export default function RootLayout() {
  useDeviceContext(tw);
  useQueryRefresh();

  const [loaded, error] = useFonts({
    "Inter-Black": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { setUser } = useStore();
  const { isLoading, data, isPending } = useUser({
    enabled: loaded && !error,
  });

  useEffect(() => {
    if (isPending || isLoading) return;
    const user = User.GetDataFromQuery(data);
    if (user) {
      setUser(User.CreateInstance(user));
    } else {
      setUser(null);
    }
    SplashScreen.hideAsync();
  }, [isLoading, isPending, data]);

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
