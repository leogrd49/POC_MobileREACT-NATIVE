import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import CameraScreen from '../screens/CameraScreen';
import MapScreen from '../screens/MapScreen';
import PlanScreen from '../screens/PlanScreen';

export type RootTabParamList = {
  Home: undefined;
  Form: undefined;
  Camera: undefined;
  Map: undefined;
  Plan: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = 'circle';
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Form':
                iconName = 'list-alt';
                break;
              case 'Camera':
                iconName = 'camera-alt';
                break;
              case 'Map':
                iconName = 'map';
                break;
              case 'Plan':
                iconName = 'grid-on';
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Accueil',
          }}
        />
        <Tab.Screen
          name="Form"
          component={FormScreen}
          options={{
            title: 'Formulaire',
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            title: 'Caméra',
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'Carte Interactive',
          }}
        />
        <Tab.Screen
          name="Plan"
          component={PlanScreen}
          options={{
            title: 'Plan de l\'essai',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};