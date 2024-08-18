import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Colors from '../res/colors';
import {Text} from 'react-native-elements';

interface LoadingProps {
  loading: boolean;
}

const CommonFooter: React.FC<LoadingProps> = ({loading}) => {
  if (!loading) {
    return null;
  }

  return (
    <View style={commonFooterStyle.footerContainer}>
      <ActivityIndicator />
      <Text style={commonFooterStyle.footerText}>加载中...</Text>
    </View>
  );
};

const commonFooterStyle = StyleSheet.create({
  footerContainer: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: 18,
    color: Colors.light.tab_unselect,
    paddingTop: 5,
  },
});

export default CommonFooter;
