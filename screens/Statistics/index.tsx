import AsyncStorage from '@react-native-async-storage/async-storage';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../components/Header';
import {DefaultProps} from '../types/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ContributionGraph} from 'react-native-chart-kit';
import dayjs from 'dayjs';
import {useWindowDimensions} from 'react-native';

interface SessionsData {
  date: string;
  count: number;
}

export const StatisticsScreen: FC<DefaultProps> = ({navigation}) => {
  const theme = useTheme();
  const [data, setData] = useState<{
    sessions: Array<SessionsData>;
    bestTime: number;
  }>({bestTime: 0, sessions: []});
  const {width} = useWindowDimensions();

  const getData = async () => {
    const data = JSON.parse((await AsyncStorage.getItem('results'))!);
    const bestTime = +(await AsyncStorage.getItem('bestTime'))!;

    if (data) {
      setData({
        sessions: Object.keys(data).reduce<SessionsData[]>(
          (prev, acc) => [...prev, {date: acc, count: data[acc]}],
          [],
        ),
        bestTime,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout style={styles.wrapper}>
      <SafeAreaView>
        <Header title="Statistics" navigation={navigation} />
        <View style={styles.container}>
          <Text category="h1" style={styles.bestTime}>
            Best time: {dayjs(data?.bestTime).format('mm:ss')}
          </Text>
          <ContributionGraph
            values={[...data!.sessions]}
            endDate={new Date()}
            numDays={105}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: theme['color-primary-default'],
              backgroundGradientFrom: theme['color-primary-default'],
              backgroundGradientTo: theme['color-primary-default'],
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.graph}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  bestTime: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  graph: {
    borderRadius: 16,
    marginLeft: 20,
    marginRight: 20,
  },
});
