import React from "react";
import tw from "@/lib/twnrc";
import { StyleSheet } from "react-native";
import { OtpInput, OtpInputProps, OtpInputRef } from "react-native-otp-entry";

const Otp = React.forwardRef<OtpInputRef, OtpInputProps>(
  (
    {
      numberOfDigits = 4,
      type = "numeric",
      theme = {},
      autoFocus = true,
      blurOnFilled = false,
      ...props
    },
    ref
  ) => (
    <Otp
      ref={ref}
      type={type}
      autoFocus={autoFocus}
      blurOnFilled={blurOnFilled}
      numberOfDigits={numberOfDigits}
      focusColor={tw.color("__black")}
      theme={{
        containerStyle: styles.containerStyle,
        pinCodeTextStyle: styles.pinCodeTextStyle,
        pinCodeContainerStyle: styles.pinCodeContainerStyle,
        filledPinCodeContainerStyle: styles.filledPinCodeContainerStyle,
        ...theme,
      }}
      {...props}
    />
  )
);

const styles = StyleSheet.create({
  containerStyle: tw`flex-row justify-center gap-5`,
  pinCodeTextStyle: tw`text-lg font-Poppins-700 text-__black`,
  pinCodeContainerStyle: tw`aspect-square rounded-xl bg-transparent h-[52px] border-1 border-grey-70`,
  filledPinCodeContainerStyle: tw`aspect-square rounded-xl bg-transparent h-[52px] border-1 border-success-500`,
});

export default Otp;
