import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StatusBar, StyleSheet, View} from 'react-native';
import Colors from '../res/colors';
import {Text} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TitleBar: React.FC<{
  title: string;
  showBackIcon?: boolean;
  onBackPress?: () => void;
}> = ({title, showBackIcon = true, onBackPress}) => {
  const navigation = useNavigation();
  const {top: statusBarHeight} = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.light.navigation_bar_background,
      justifyContent: 'center',
      alignItems: 'center',
    },

    titleContainer: {
      flex: 1,
      paddingTop: statusBarHeight,
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
    },

    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.light.navigation_text,
    },

    backIcon: {
      paddingTop: statusBarHeight,
      paddingLeft: 15,
      position: 'absolute',
      left: 0,
    },
  });

  return (
    <View style={[styles.container, {height: statusBarHeight + 44}]}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.titleContainer}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Pressable
          style={styles.backIcon}
          onPress={() => {
            if (onBackPress != null) {
              onBackPress();
            } else {
              navigation.goBack();
            }
          }}>
          {showBackIcon && (
            <MaterialIcons
              name="arrow-back-ios-new"
              color={Colors.light.navigation_text}
              size={20}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default TitleBar;
