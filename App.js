import { StatusBar } from "expo-status-bar";
import Login from "./src/Screens/Login";
import Home from "./src/Screens/Home";
import Register from "./src/Screens/Register";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from "react";



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign up" component={Register} />
    </Stack.Navigator>
  </NavigationContainer>
        
      
  );
}

