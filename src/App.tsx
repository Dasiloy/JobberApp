/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import tw, {useDeviceContext} from 'twrnc';
import {Text, View} from 'react-native';
import client from './graphql';
import {ApolloProvider} from '@apollo/client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function () {
  useDeviceContext(tw);
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView>
        <View>
          <Text style={tw`px-5 m-10 text-red-500 bg-white`}>Jobber App</Text>
        </View>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
