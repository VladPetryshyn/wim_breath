import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {count} from '../../../utils/count';
import {DefaultBreathingProps} from '../../types';
import {SummaryModeResult} from './Results';
import AsyncStorage from '@react-native-async-storage/async-storage';

const format = 'mm:ss';

export const SummaryMode: FC<DefaultBreathingProps<'SummaryMode'>> = ({
  route: {
    params: {sessions},
  },
  navigation: {goBack},
}) => {
  const styles = useStyleSheet(themedStyles);
  const average = Math.round(count(sessions) / sessions.length);

  const onSave = async () => {
    console.log(await AsyncStorage.getItem('bestTime'));
    if (+(await AsyncStorage.getItem('bestTime'))! < average) {
      await AsyncStorage.setItem('bestTime', average + '');
    }

    const today = dayjs().format('YYYY-MM-DD');
    const results = JSON.parse((await AsyncStorage.getItem('results'))!);
    if (results[today]) {
      results[today] += sessions.length;
    } else {
      results[today] = sessions.length;
    }
    await AsyncStorage.setItem('results', JSON.stringify(results));

    goBack();
  };

  return (
    <Layout style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text category="h1">WELL DONE</Text>
          <Text category="p1">
            Take a breath and relax, regain your normal breathing speed. Here
            are your results
          </Text>
        </View>
        <ScrollView style={styles.results}>
          <SummaryModeResult
            title="AVERAGE"
            time={dayjs(average).format(format)}
            style={styles.average}
          />
          {sessions.map((session, idx) => (
            <SummaryModeResult
              title={`ROUND ${idx + 1}`}
              time={dayjs(session).format(format)}
              key={idx}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.buttons}>
        <Button
          appearance="outline"
          status="danger"
          style={styles.button}
          onPress={goBack}>
          RESET
        </Button>
        <Button appearance="outline" style={styles.button} onPress={onSave}>
          SAVE
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  results: {
    marginTop: 40,
  },
  buttons: {
    position: 'absolute',
    bottom: 70,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginLeft: 40,
  },
  average: {
    backgroundColor: 'color-primary-disabled',
  },
});
