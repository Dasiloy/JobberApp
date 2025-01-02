import { useStore } from "@/store";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useStore();

  const instance = user?.getInstance();
  console.log(instance);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
