import tw from "@/lib/twnrc";
import React from "react";
import {
  TouchableOpacityProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  icon?: React.ReactNode;
  size?: number;
  backgroundColor?: string;
  rounded?: boolean;
  shadow?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 56,
  backgroundColor = "white",
  rounded = false,
  shadow = false,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        tw.style({
          width: size,
          height: size,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: rounded ? size / 2 : 0,
        }),
        shadow && styles.shadow,
        style,
      ]}
      {...props}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: tw.color("black"),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 20,
    elevation: 4,
  },
});

export default IconButton;
