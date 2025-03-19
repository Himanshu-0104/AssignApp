// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import { USERS } from './utils/users';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(USERS[0]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {(props) => (
            <Home {...props} currentUser={user} setUser={setUser} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ChatScreen"
          options={({ route }) => ({ title: route.params.chatUser })}
        >
          {(props) => <ChatScreen {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
