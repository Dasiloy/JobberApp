import React from "react";
import Input, { InputProps } from ".";
import { LockIcon } from "@/assets/svgs";
import { useBoolean } from "@/hooks/use_boolean";
import FeatherIcon from "@expo/vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";

const PassWordInput = React.forwardRef<
  TextInput,
  Omit<InputProps, "LeftIcon" | "RightIcon">
>((props, ref) => {
  const [visible, setVisible] = useBoolean(false);
  return (
    <Input
      ref={ref}
      LeftIcon={<LockIcon />}
      secureTextEntry={!visible}
      RightIcon={
        <FeatherIcon
          size={20}
          onPress={setVisible.toggle}
          name={visible ? "eye-off" : "eye"}
        />
      }
      {...props}
    />
  );
});

export default PassWordInput;
