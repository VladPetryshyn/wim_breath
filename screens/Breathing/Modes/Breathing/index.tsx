import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import {DefaultBreathingProps} from '../../types';
import {
  centeredContainerStyles,
  circleStyles,
} from '../../../utils/sharedStyles';
import {FinishButton} from '../../components/Finish';
import Sound from 'react-native-sound';

export const BreathingMode: FC<DefaultBreathingProps<'BreathingMode'>> = ({
  route,
  navigation,
}) => {
  Sound.setCategory('Playback', true);
  const styles = useStyleSheet(themedStyles);
  const offset = useSharedValue(0);
  const [count, setCount] = useState(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: offset.value,
      },
    ],
  }));

  useEffect(() => {
    const breathing = new Sound(
      'breathing_cycle_medium_breathing.mp3',
      undefined,
      () => {
        breathing.play();
      },
    );
    const wim = new Sound('breathing_cycle_medium_wim.mp3', undefined, () => {
      wim.play();
    });
    return () => {
      wim.release();
      breathing.release();
    };
  }, []);

  const goToRetention = () =>
    navigation.replace('RetentionMode', route.params!);

  useEffect(() => {
    const duration = 1750;
    const counter = setInterval(
      () => setCount(prevCount => prevCount + 1),
      duration * 2,
    );
    offset.value = withRepeat(withTiming(1, {duration}), -1, true);

    return () => {
      clearInterval(counter);
    };
  }, []);

  if (count === 61) {
    goToRetention();
  }

  return (
    <Layout style={styles.container}>
      <Text category="h1">take 60 deep breaths</Text>
      <TouchableOpacity
        onLongPress={goToRetention}
        style={styles.counterContainer}>
        <Animated.View style={[styles.containerBox, animatedStyles]}>
          <Animated.View style={[styles.box, animatedStyles]}>
            <Text category="h1">{count}</Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
      <Text category="s1">long press to go into retention mode</Text>
      <FinishButton route={route} navigation={navigation} />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  counterContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  container: {
    ...centeredContainerStyles,
  },
  box: {
    ...circleStyles(200),
  },
  containerBox: {
    ...circleStyles(225),
    backgroundColor: 'color-primary-disabled',
  },
});
