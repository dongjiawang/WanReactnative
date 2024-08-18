import React from 'react';
import {observer} from 'mobx-react-lite';
import GlobalStore from '../store/GlobalStore';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {colors, Text} from 'react-native-elements';
import Colors from '../res/colors';

const Loading: React.FC = observer(() => {
  if (!GlobalStore.loading) {
    return null;
  }

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingContentWrapper}>
        <ActivityIndicator
          size="large"
          color={Platform.OS === 'android' ? Colors.themeColor : colors.grey1}
        />
        <Text style={styles.text}>加载中...</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingContentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
  },
  text: {
    paddingTop: 5,
  },
});

export default Loading;
