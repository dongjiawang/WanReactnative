import {View, Text, StyleSheet} from 'react-native';

const TreePage = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'red',
      fontSize: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>体系</Text>
    </View>
  );
};

export default TreePage;
