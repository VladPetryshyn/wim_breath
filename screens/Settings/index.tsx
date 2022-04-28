import {Layout} from '@ui-kitten/components';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {DefaultProps} from '../types/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/Header';

export const SettingsScreen: FC<DefaultProps> = ({navigation}) => {
  return (
    <Layout style={styles.container}>
      <SafeAreaView>
        <Header title="Settings" navigation={navigation} />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
