import {Text} from '@ui-kitten/components';
import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  title: string;
  time: string;
  style?: ViewStyle;
}

export const SummaryModeResult: FC<Props> = ({title, time, style}) => (
  <View style={[styles.container, style]}>
    <Text category="h4">{title}</Text>
    <Text category="h4">{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 10,
  },
});
