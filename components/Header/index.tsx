import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import React, {FC} from 'react';
import {StackParamList} from '../../screens/types/stack';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

interface Props {
  title: string;
  navigation: NativeStackNavigationProp<StackParamList>;
}

export const Header: FC<Props> = ({title, navigation}) => {
  const goBack = () => navigation.goBack();

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );
  return (
    <TopNavigation
      alignment="center"
      title={title}
      accessoryLeft={renderBackAction}
    />
  );
};
