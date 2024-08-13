/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import tw, {useDeviceContext} from 'twrnc';
import {Text, View} from 'react-native';

export default function () {
  useDeviceContext(tw);
  return (
    <View>
      <Text style={tw`m-10 text-red-500 bg-white px-5`}>Jobber App</Text>
    </View>
  );
}
