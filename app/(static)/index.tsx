import Divider from "@/atoms/divider";
import { useStore } from "@/store";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}></View>
  );
}
