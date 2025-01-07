import tw from "@/lib/twnrc";
import { useStore } from "@/store";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isFirstTime, user } = useStore();

  if (isFirstTime) {
    return <Redirect href={"/"} />;
  }

  if (!user) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Stack
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
        contentStyle: tw`bg-__bg`,
      }}
    />
  );
}
