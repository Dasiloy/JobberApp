import React from "react";
import tw from "@/lib/twnrc";
import {
  ImageBackground,
  ImageBackgroundProps,
  View,
  ViewProps,
} from "react-native";
import { omit } from "lodash";

interface BackgroundProps extends ViewProps {
  width: any;
  height: any;
  imageProps?: ImageBackgroundProps;
}
const Background: React.FC<BackgroundProps> = ({
  style,
  width,
  height,
  children,
  imageProps = {},
}) => {
  return (
    <View
      style={[
        tw.style("overflow-hidden", {
          width,
          minHeight: height,
        }),
        style,
      ]}>
      <ImageBackground
        resizeMode='cover'
        style={[tw`flex-1`, imageProps.style]}
        {...omit(imageProps, ["style"])}>
        {children}
      </ImageBackground>
    </View>
  );
};
export default Background;
