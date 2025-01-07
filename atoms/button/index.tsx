import React from "react";
import tw from "@/lib/twnrc";
import { omit } from "lodash";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
  ActivityIndicator,
} from "react-native";

export interface AppButtonProps extends TouchableOpacityProps {
  label?: string;
  full?: boolean;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  labelProps?: Omit<TextProps, "'children">;
  variant?: "primary" | "ghost";
}
const AppButton: React.FC<AppButtonProps> = ({
  label,
  full = false,
  loading = false,
  labelProps = {},
  style,
  variant = "primary",
  children,
  rightIcon,
  leftIcon,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, full && styles.full, styles[variant], style]}
      {...props}>
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : children ? (
        children
      ) : (
        <React.Fragment>
          {leftIcon ? leftIcon : null}
          <Text
            {...omit(labelProps, "style")}
            style={[
              styles.label,
              variant === "primary" && styles.labelPrimary,
              variant === "ghost" && styles.labelGhost,
              labelProps?.style,
            ]}>
            {label}
          </Text>
          {rightIcon ? rightIcon : null}
        </React.Fragment>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  full: tw`self-stretch`,
  primary: tw`bg-primary-500`,
  ghost: tw`bg-transparent px-0 py-0 rounded-none`,
  label: tw`text-lg leading-[24px] tracking-tight`,
  labelPrimary: tw`text-white font-Poppins-500 `,
  labelGhost: tw`text-grey-60 font-Poppins-400`,
  button: tw`flex-row items-center justify-center gap-2.5 px-12 py-4 rounded-[5px]  self-start`,
});

export default AppButton;
