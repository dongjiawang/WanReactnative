import {View, Text, StyleSheet} from 'react-native';
import GlobalStore from '../../store/GlobalStore';
import {useEffect} from 'react';

const HomePage = () => {
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

  useEffect(() => {
    const globalStore = new GlobalStore();

    globalStore.setLoading(true);
    // 执行异步操作
    // globalStore.setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>首页</Text>
    </View>
  );
};

export default HomePage;
