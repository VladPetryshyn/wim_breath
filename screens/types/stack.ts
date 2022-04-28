import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackParamList = {
  Home: undefined;
  Settings: undefined;
  Statistics: undefined;
  Breathing: undefined;
};

export type DefaultProps = NativeStackScreenProps<StackParamList>;
