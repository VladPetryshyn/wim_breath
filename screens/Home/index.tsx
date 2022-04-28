import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DefaultProps, StackParamList} from '../types/stack';
import {centeredContainerStyles} from '../utils/sharedStyles';

export const HomeScreen: FC<DefaultProps> = ({navigation}) => {
  const navigate = (route: keyof StackParamList) => () =>
    navigation.navigate(route);
  return (
    <Layout style={styles.container}>
      <SafeAreaView>
        <Text category="h1">Wim Breath</Text>
        <View style={styles.buttonsContainer}>
          <Button
            appearance="outline"
            size="medium"
            onPress={navigate('Breathing')}>
            Start breathing
          </Button>
          <Button
            appearance="outline"
            size="medium"
            style={styles.button}
            onPress={navigate('Statistics')}>
            Statistics
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    ...centeredContainerStyles,
  },
  button: {
    marginTop: 15,
  },
  buttonsContainer: {
    marginTop: 70,
  },
});
