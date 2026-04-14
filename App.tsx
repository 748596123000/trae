import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import pages
import HomePage from './src/pages/HomePage';
import TripPlannerPage from './src/pages/TripPlannerPage';
import DiscoverPage from './src/pages/DiscoverPage';
import CommunityPage from './src/pages/CommunityPage';
import ProfilePage from './src/pages/ProfilePage';
import TripDetailPage from './src/pages/TripDetailPage';
import POIDetailPage from './src/pages/POIDetailPage';
import GroupDetailPage from './src/pages/GroupDetailPage';
import AIAssistantPage from './src/pages/AIAssistantPage';

// Create query client
const queryClient = new QueryClient();

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TripPlanner') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ title: '首页' }} />
      <Tab.Screen name="TripPlanner" component={TripPlannerPage} options={{ title: '行程规划' }} />
      <Tab.Screen name="Discover" component={DiscoverPage} options={{ title: '发现' }} />
      <Tab.Screen name="Community" component={CommunityPage} options={{ title: '社区' }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ title: '我的' }} />
    </Tab.Navigator>
  );
}

// Root stack navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#3B82F6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="TripDetail" component={TripDetailPage} options={{ title: '行程详情' }} />
            <Stack.Screen name="POIDetail" component={POIDetailPage} options={{ title: '景点详情' }} />
            <Stack.Screen name="GroupDetail" component={GroupDetailPage} options={{ title: '拼团详情' }} />
            <Stack.Screen name="AIAssistant" component={AIAssistantPage} options={{ title: 'AI助手' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}