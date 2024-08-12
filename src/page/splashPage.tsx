import {Image, StyleSheet, View, Appearance} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Main, RootStackParamList} from '../route/router';
import Colors from '../res/colors';

const SplashPage = () => {
  const colorScheme = Appearance.getColorScheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        colorScheme === 'dark'
          ? Colors.dark.window_background
          : Colors.light.window_background,
    },
    logo: {
      flex: 1,
      resizeMode: 'center',
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(Main);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/logo.png')} style={styles.logo} />
    </View>
  );
};

export default SplashPage;
