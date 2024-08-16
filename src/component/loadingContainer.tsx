import React from 'react';
import {observer} from 'mobx-react-lite';
import GlobalStore from '../store/GlobalStore';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

const globalStore = new GlobalStore();

const Loading: React.FC = observer(() => {
  if (!globalStore.loading) {
    return null;
  }

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingContentWrapper}>
        <ActivityIndicator size="large" />
        <Text>加载中...</Text>
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
});

export default Loading;
