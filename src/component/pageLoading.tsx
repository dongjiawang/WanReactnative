import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-elements';

export enum LoadState {
  LOADING,
  SUCCESS,
  FAIL,
  EMPTY,
}

const PageLoading: React.FC<{
  loadingState: LoadState;
  onReload?: () => void;
  children?: React.ReactNode;
}> = ({loadingState = LoadState.LOADING, onReload, children}) => {
  const commonContentView = () => {
    if (loadingState === LoadState.FAIL) {
      return (
        <Pressable onPress={onReload} style={stateStyle.pressContent}>
          <View style={stateStyle.content}>
            <MaterialIcons name="sms-failed" color="black" size={50} />
            <Text style={stateStyle.tipText}>加载错误</Text>
          </View>
        </Pressable>
      );
    } else if (loadingState === LoadState.EMPTY) {
      return (
        <View style={stateStyle.content}>
          <MaterialIcons name="hourglass-empty" color="black" size={50} />
          <Text style={stateStyle.tipText}>暂无数据</Text>
        </View>
      );
    }
  };

  if (loadingState === LoadState.FAIL || loadingState === LoadState.EMPTY) {
    return commonContentView();
  } else {
    return <>{children}</>;
  }
};

const stateStyle = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  pressContent: {
    flex: 1,
  },

  tipText: {
    fontSize: 20,
    paddingTop: 20,
  },
});

export default PageLoading;
