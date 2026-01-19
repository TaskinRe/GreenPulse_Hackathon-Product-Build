import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { UserProvider, UserContext } from './src/context/UserContext';
import Colors from './src/constants/Colors';

import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import MapScreen from './src/screens/MapScreen';
import WalletScreen from './src/screens/WalletScreen';
import ScanScreen from './src/screens/ScanScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#fff',
        tabBarActiveTintColor: Colors.primary,
        tabBarIcon: ({ focused, color, size }) => {
          let icon = 'home';
          if (route.name === 'Map') icon = 'map';
          if (route.name === 'Ranks') icon = 'trophy';
          if (route.name === 'Wallet') icon = 'wallet';
          if (route.name === 'Support') icon = 'chatbubbles';
          return <Ionicons name={focused ? icon : `${icon}-outline`} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} options={{ title: 'Green Pulse' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Locations' }} />
      <Tab.Screen name="Ranks" component={LeaderboardScreen} options={{ title: 'National Ranking' }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ title: 'Rewards' }} />
      <Tab.Screen name="Support" component={FeedbackScreen} options={{ title: 'Citizen Voice' }} />
    </Tab.Navigator>
  );
}

function NavigationWrapper() {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Scan" component={ScanScreen} options={{ headerShown: true, title: 'Scan Bin' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationWrapper />
    </UserProvider>
  );
}