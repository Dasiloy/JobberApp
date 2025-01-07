import tw from "@/lib/twnrc";
import { useStore } from "@/store";
import { Redirect, Stack } from "expo-router";

export default function StaticLayout() {
  const { isFirstTime, user } = useStore();

  if (!isFirstTime) {
    return <Redirect href={!!user ? "/home" : "/login"} />;
  }

  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        headerShown: false,
        contentStyle: tw`bg-__bg`,
      }}
    />
  );
}
