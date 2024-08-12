import {View, Text, StyleSheet} from 'react-native';

const HomePage = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      color: 'red',
      fontSize: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>首页</Text>
    </View>
  );
};

export default HomePage;
