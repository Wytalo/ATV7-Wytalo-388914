/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListUserScreen from './crud/ListUserScreen';
import EditUserScreen from './crud/EditUserScreen';
import AddUserScreen from './crud/AddUserScreen';

const MainStack = createStackNavigator();

function MainStackScreens() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="ListUserScreen"
        component={ListUserScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="EditUserScreen"
        component={EditUserScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

export default MainStackScreens;
