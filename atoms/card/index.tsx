import tw from "@/lib/twnrc";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export interface CardProps extends ViewProps {
  bgColor?: string;
  shadow?: boolean;
  borderRadius?: number;
}

const Card: React.FC<CardProps> = ({
  bgColor = tw.color("white"),
  shadow,
  style,
  borderRadius,
  children,
  ...rest
}) => {
  return (
    <View
      style={[
        tw.style({
          backgroundColor: bgColor,
          borderRadius: borderRadius,
        }),
        shadow && styles.shadow,
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#0D1526",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default Card;
