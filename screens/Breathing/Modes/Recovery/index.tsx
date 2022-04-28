import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  centeredContainerStyles,
  circleStyles,
} from '../../../utils/sharedStyles';
import {FinishButton} from '../../components/Finish';
import {DefaultBreathingProps} from '../../types';
import Sound from 'react-native-sound';

export const RecoveryMode: FC<DefaultBreathingProps<'RecoveryMode'>> = ({
  navigation,
  route,
}) => {
  const styles = useStyleSheet(themedStyles);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const wim = new Sound('breathing_recovery_wim.mp3', undefined, () => {
      wim.play();
    });
    const music = new Sound('breathing_recovery_music.mp3', undefined, () => {
      music.play();
    });
    return () => {
      music.release();
      wim.release();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(p => {
        return p - 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);
  if (timeLeft === -1) {
    navigation.replace('BreathingMode', route.params);
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.box}>
        <Text category="h1">{timeLeft}</Text>
      </View>
      <FinishButton route={route} navigation={navigation} />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    ...centeredContainerStyles,
  },
  box: {
    ...circleStyles(200),
  },
});
