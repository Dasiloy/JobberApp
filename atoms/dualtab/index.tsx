import React from "react";
import tw from "@/lib/twnrc";
import { View, Pressable, ViewProps, Text, StyleSheet } from "react-native";

interface DualTabProps extends ViewProps {
  firstLabel: string;
  secondLabel: string;
  firstIcon?: React.ReactNode;
  secondIcon?: React.ReactNode;
  firstValue: string;
  secondValue: string;
  activeTab?: string;
  onChangeTab?: (tab: string) => void;
}

const DualTab: React.FC<DualTabProps> = ({
  firstLabel,
  secondLabel,
  firstIcon,
  secondIcon,
  firstValue,
  secondValue,
  onChangeTab,
  activeTab,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.tabContainer, style]} {...rest}>
      {[
        { label: firstLabel, value: firstValue, icon: firstIcon },
        { label: secondLabel, value: secondValue, icon: secondIcon },
      ].map((tab) => (
        <Pressable
          key={tab.value}
          onPress={() => onChangeTab?.(tab.value)}
          style={[styles.tab, activeTab === tab.value && styles.tabActive]}>
          {tab.icon}
          <Text
            style={[
              styles.tabText,
              activeTab === tab.value && styles.tabTextActive,
            ]}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: tw`w-full bg-primary-50 p-1.5 flex-row 
                     rounded-2xl items-center gap-4`,
  tab: tw`flex-row flex-1 bg-transparent items-center
             justify-center gap-2.5 py-2.5 rounded-2xl`,
  tabActive: tw`bg-white`,
  tabTextActive: tw`font-Poppins-500`,
  tabText: tw`text-base font-Poppins-400 leading-normal tracking-tight`,
});

export default DualTab;
