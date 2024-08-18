/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
// import {useColorScheme} from 'react-native';
// import Colors from './src/res/colors';
import {NavigationContainer} from '@react-navigation/native';
import {AppRouter} from './src/route/router';
import StatusBarManager from './src/utils/StatusBarManager';
import Toast from 'react-native-toast-message';
import Loading from './src/component/LoadingContainer';

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode
  //     ? Colors.dark.window_background
  //     : Colors.light.window_background,
  // };

  useEffect(() => {
    StatusBarManager.setImmersiveStatusBar();
  }, []);

  return (
    <NavigationContainer>
      <AppRouter />
      <Loading />
      <Toast />
    </NavigationContainer>
  );
}

export default App;
