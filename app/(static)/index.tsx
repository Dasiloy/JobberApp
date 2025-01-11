import Otp from "@/atoms/otp";
import useStateManager from "@/hooks/use_state_manager";
import tw from "@/lib/twnrc";
import { useStore } from "@/store";
import { View } from "react-native";

export default function Index() {
  const { user } = useStore();
  const {} = useStateManager({
    defaultValue: "",
  });

  return (
    <View
      style={{
        flex: 1,
        gap: 16,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Otp />
    </View>
  );
}
