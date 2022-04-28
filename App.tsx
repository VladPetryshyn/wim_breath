import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/Home';
import {SettingsScreen} from './screens/Settings';
import {StackParamList} from './screens/types/stack';
import {StatisticsScreen} from './screens/Statistics';
import {BreathingScreen} from './screens/Breathing';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const theme = useColorScheme();

  const asyncStorageSetup = async () => {
    if (!(await AsyncStorage.getItem('bestTime'))) {
      await AsyncStorage.setItem('bestTime', '0');
      await AsyncStorage.setItem('results', '[]');
    }
  };

  useEffect(() => {
    asyncStorageSetup();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={theme === 'dark' ? eva.dark : eva.light}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Statistics" component={StatisticsScreen} />
            <Stack.Screen name="Breathing" component={BreathingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
