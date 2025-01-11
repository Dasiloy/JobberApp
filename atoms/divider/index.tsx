import tw from "@/lib/twnrc";
import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";

interface DividerProps extends Omit<ViewProps, "children"> {}

const Divider: React.FC<DividerProps> = ({ style, ...rest }) => {
  return <View style={[styles.divider, style]} {...rest} />;
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    borderTopWidth: 0.5,
    borderColor: tw.color("grey-70"),
  },
});

export default Divider;
