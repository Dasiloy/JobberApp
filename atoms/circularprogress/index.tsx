import tw from "@/lib/twnrc";
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  Text,
  TextProps,
  StyleSheet,
} from "react-native";
import Svg, { Circle, G } from "react-native-svg";

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  duration?: number;
  color?: string;
  label?: string;
  backgroundColor?: string;
  labelStyle?: TextProps["style"];
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 80,
  strokeWidth = 10,
  progress = 25,
  duration = 500,
  labelStyle,
  label,
  color = tw.color("primary-500"),
  backgroundColor = tw.color("grey-95"),
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
  const halfSize = size / 2;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg height={size} width={size}>
        <G rotation='-90' origin={`${halfSize}, ${halfSize}`}>
          {/* Background Circle */}
          <Circle
            cx={halfSize}
            cy={halfSize}
            r={halfSize - strokeWidth / 2}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill='none'
          />
          {/* Progress Circle */}
          <AnimatedCircle
            cx={halfSize}
            cy={halfSize}
            r={halfSize - strokeWidth / 2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill='none'
          />
        </G>
      </Svg>
      <View style={styles.absolute}>
        <Text style={[styles.label, labelStyle]}>
          {label || `${Math.round(progress)}%`}
        </Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  label: tw`text-base font-Poppins-400 tracking-tighter leading-5 text-__black`,
  absolute: tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`,
});

export default CircularProgress;
