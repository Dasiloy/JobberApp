import React from "react";
import tw from "@/lib/twnrc";
import { View, StyleSheet, ViewProps } from "react-native";

interface FlexProps extends ViewProps {
  children?: React.ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: number;
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  style,
  gap = 0,

  ...rest
}) => {
  return (
    <View
      style={[
        styles.flex,
        tw.style({
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          flexWrap: wrap,
          gap,
        }),
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
  },
});

export default Flex;
