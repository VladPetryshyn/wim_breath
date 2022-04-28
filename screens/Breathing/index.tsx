import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import {BreathingMode} from './Modes/Breathing';
import {RecoveryMode} from './Modes/Recovery';
import {RetentionMode} from './Modes/Retention';
import {SummaryMode} from './Modes/Summary';
import {BreathingStackParamList} from './types';

const BreathingStack = createNativeStackNavigator<BreathingStackParamList>();

export const BreathingScreen = () => {
  useKeepAwake();
  return (
    <BreathingStack.Navigator
      initialRouteName="BreathingMode"
      screenOptions={{headerShown: false}}>
      <BreathingStack.Screen
        name="BreathingMode"
        component={BreathingMode}
        initialParams={{sessions: []}}
      />
      <BreathingStack.Screen
        name="RetentionMode"
        component={RetentionMode}
        initialParams={{sessions: []}}
      />
      <BreathingStack.Screen
        name="RecoveryMode"
        component={RecoveryMode}
        initialParams={{sessions: []}}
      />
      <BreathingStack.Screen
        name="SummaryMode"
        component={SummaryMode}
        initialParams={{sessions: []}}
      />
    </BreathingStack.Navigator>
  );
};
