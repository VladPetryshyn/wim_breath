import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  centeredContainerStyles,
  circleStyles,
} from '../../../utils/sharedStyles';
import {FinishButton} from '../../components/Finish';
import {BreathingStackParamList, DefaultBreathingProps} from '../../types';
import Sound from 'react-native-sound';

export const RetentionMode: FC<DefaultBreathingProps<'RetentionMode'>> = ({
  navigation,
  route,
}) => {
  const styles = useStyleSheet(themedStyles);
  const [retentionTime, setRetentionTime] = useState(0);

  useEffect(() => {
    const music = new Sound('breathing_retention_music.mp3', undefined, () => {
      music.play();
    });
    const wim = new Sound('breathing_retention_wim.mp3', undefined, () => {
      wim.play();
    });
    const ping = new Sound('breathing_retention_ping.mp3', undefined, () => {
      ping.play();
    });
    return () => {
      ping.release();
      music.release();
      wim.release();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRetentionTime(prevTime => prevTime + 1000);
    }, 1019);

    return () => clearInterval(interval);
  }, []);

  const goTo = (screen: keyof BreathingStackParamList) => () =>
    navigation.replace(screen, {
      sessions: [...route.params!.sessions, retentionTime],
    });

  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        onPress={goTo('RecoveryMode')}
        onLongPress={goTo('SummaryMode')}>
        <View style={styles.box}>
          <Text category="h1">{dayjs(retentionTime).format('mm:ss')}</Text>
        </View>
      </TouchableOpacity>
      <Text category="s1" style={styles.subtext}>
        Press to go into recovery mode
      </Text>
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
  subtext: {
    marginTop: 20,
  },
});
