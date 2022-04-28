import {ViewStyle} from 'react-native';

export const centeredContainerStyles: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  position: 'relative',
};

export const circleStyles = (size: number): ViewStyle => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'color-primary-default',
});
