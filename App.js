// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageOne from "./Pages/PageOne";
import PageTwo from "./Pages/PageTwo";
import PageThree from "./Pages/PageThree";

const Stack = createStackNavigator();

const App = () => {
  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="PageOne" component={PageOne} />
          <Stack.Screen name="PageTwo" component={PageTwo} />
            <Stack.Screen name="PageThree" component={PageThree} />
        </Stack.Navigator>
      </NavigationContainer>

  );
};

export default App;
