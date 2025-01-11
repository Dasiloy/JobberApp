import React from "react";
import tw from "@/lib/twnrc";
import {
  Text,
  PressableProps,
  StyleProp,
  TextStyle,
  Pressable,
  StyleSheet,
} from "react-native";
import { Image, ImageProps } from "expo-image";
import { omit } from "lodash";

interface AvatarProps extends PressableProps {
  size: number;
  imageProps?: ImageProps;
  name?: string;
  nameStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  shape?: "circle" | "square";
  backgroundColor?: string;
}
interface AvatarState {
  imageFailed: boolean;
}

class Avatar extends React.Component<AvatarProps, AvatarState> {
  constructor(props: AvatarProps) {
    super(props);
    this.state = {
      imageFailed: false,
    };
  }
  handleImageError = () => {
    this.setState({ imageFailed: true });
  };

  handleImageLoad = () => {
    this.setState({ imageFailed: false });
  };

  renderChild() {
    const { imageProps = {}, name, nameStyle, icon } = this.props;
    const { imageFailed } = this.state;

    if (!imageFailed && imageProps.source) {
      return (
        <Image
          {...omit(imageProps, ["style"])}
          style={[styles.image, imageProps.style]}
          onError={this.handleImageError}
          onLoad={this.handleImageLoad}
        />
      );
    }

    if (icon) {
      return icon;
    }

    if (name) {
      return <Text style={[styles.name, nameStyle]}>{name}</Text>;
    }

    return null;
  }

  render() {
    const {
      size,
      shape = "circle",
      backgroundColor,
      style,
      imageProps = {},
      name,
      nameStyle,
      icon,
      ...rest
    } = this.props;

    return (
      <Pressable
        style={[
          tw.style({
            width: size,
            backgroundColor,
          }),
          styles.avatar,
          shape === "circle" && styles.circleAvatar,
          shape === "square" && styles.squareAvatar,
          style as any,
        ]}
        {...rest}>
        {this.renderChild()}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  avatar: tw`aspect-square overflow-hidden items-center justify-center`,
  circleAvatar: tw`rounded-full`,
  squareAvatar: tw`rounded-sm`,
  name: tw`text-base font-Poppins-500`,
  image: tw`w-full h-full`,
});

export default Avatar;
