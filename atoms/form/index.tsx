import React from "react";
import tw from "@/lib/twnrc";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import Input from "../input";
import AppButton from "../button";

interface FormProps extends ViewProps {
  onSubmit: () => void;
}
const Form: React.FC<FormProps> = ({ children, onSubmit, style, ...rest }) => {
  const handleOnSubmit = () => {
    console.log("Form submitted");
    Keyboard.dismiss();
    onSubmit();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={tw`flex-grow`}
          keyboardShouldPersistTaps='handled'>
          <View style={[tw`flex-1`, style]} {...rest}>
            {React.Children.map(children, (child) => {
              if (
                (child as any)?.type === TextInput ||
                (child as any)?.type === Input
              ) {
                return React.cloneElement(child as any, {
                  blurOnSubmit: true,
                  onSubmitEditing: Keyboard.dismiss,
                  returnKeyType: "done",
                });
              }
              if ((child as any)?.type === AppButton) {
                return React.cloneElement(child as any, {
                  onPress: handleOnSubmit,
                });
              }
              return child;
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Form;
