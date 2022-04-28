import {Button} from '@ui-kitten/components';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {DefaultBreathingProps} from '../../types';

export const FinishButton: FC<DefaultBreathingProps<any>> = ({
  navigation,
  route,
}) => {
  const goToSummary = () => {
    if (route.params.sessions.length > 0) {
      navigation.replace('SummaryMode', route.params!);
    } else {
      navigation.goBack();
    }
  };
  return (
    <Button
      appearance="ghost"
      size="giant"
      style={styles.button}
      onPress={goToSummary}>
      Finish
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 70,
  },
});
