import {NativeStackScreenProps} from '@react-navigation/native-stack';

type ModeParams = {sessions: number[]};

export type BreathingStackParamList = {
  BreathingMode: ModeParams;
  RetentionMode: ModeParams;
  SummaryMode: ModeParams;
  RecoveryMode: ModeParams;
};

export type DefaultBreathingProps<T extends keyof BreathingStackParamList> =
  NativeStackScreenProps<BreathingStackParamList, T>;
