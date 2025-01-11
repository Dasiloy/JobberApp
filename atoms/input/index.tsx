import { useBoolean } from "@/hooks/use_boolean";
import tw from "@/lib/twnrc";
import React from "react";
import {
  View,
  Text,
  ViewProps,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export interface InputProps extends TextInputProps {
  focused?: boolean;
  error?: string;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  inputContainerStyle?: ViewProps["style"];
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      style,
      focused,
      error,
      LeftIcon,
      RightIcon,
      inputContainerStyle,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useBoolean(focused);

    const iconColor = React.useMemo(
      () => (isFocused ? tw.color("primary-500") : tw.color("grey-70")),
      [isFocused]
    );

    return (
      <View style={inputContainerStyle}>
        <View
          style={[
            styles.inputBox,
            (isFocused || props.value) && styles.inputBoxFocused,
            !!error && styles.inputBoxError,
          ]}>
          {LeftIcon &&
            React.cloneElement(LeftIcon as React.ReactElement, {
              color: (LeftIcon as any).props.color || iconColor,
            })}
          <TextInput
            ref={ref}
            autoCapitalize='none'
            {...props}
            onBlur={(e) => {
              setIsFocused.off();
              onBlur?.(e);
            }}
            onFocus={(e) => {
              setIsFocused.on();
              onFocus?.(e);
            }}
            underlineColorAndroid={"transparent"}
            selectionColor={tw.color("primary-500")}
            placeholderTextColor={tw.color("grey-70")}
            style={[styles.input, style]}
          />
          {RightIcon &&
            React.cloneElement(RightIcon as React.ReactElement, {
              color: (RightIcon as any).props.color || iconColor,
            })}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: tw`flex-1 h-full text-base -tracking-tight
             text-__black leading-5 font-Poppins-500`,
  error: tw`text-danger-500 py-1 px-2 text-base font-Poppins-400`,
  inputBox: tw`h-[52px] w-full flex-row items-center gap-2.5 px-6
               bg-transparent border-2 rounded-[10px] border-grey-70`,
  inputBoxFocused: tw`border-__black`,
  inputBoxError: tw`border-danger-500`,
});

export default Input;
