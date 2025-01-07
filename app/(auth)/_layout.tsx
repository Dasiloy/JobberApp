import tw from "@/lib/twnrc";
import { useStore } from "@/store";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isFirstTime, user } = useStore();

  if (isFirstTime) {
    return <Redirect href={"/"} />;
  }

  if (user) {
    return <Redirect href={"/home"} />;
  }

  return (
    <Stack
      initialRouteName='register'
      screenOptions={{
        headerShown: false,
        contentStyle: tw`bg-__bg`,
      }}
    />
  );
}
