import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyComponent from './components/MyComponent';
import StandardTimer from './components/StandardTimer';
import RoundTimer from './components/RoundTimer';
import IntervalTimer from './components/IntervalTimer';
import { RootStackParamList } from './types'; // Import the type

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MyComponent} />
        <Stack.Screen name="StandardTimer" component={StandardTimer} />
        <Stack.Screen name="RoundTimer" component={RoundTimer} />
        <Stack.Screen name="IntervalTimer" component={IntervalTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
