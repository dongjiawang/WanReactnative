import Colors from '../res/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, Question, Tree, Mine} from '../route/router';
import HomePage from './home/homePage';
import QuestionPage from './question/questionPage';
import TreePage from './tree/treePage';
import MinePage from './mine/minePage';

interface TabBarIconProps {
  color: string;
  size: number;
  name: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({color, size, name}) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

const MainPage = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={Home}
      screenOptions={{
        tabBarActiveTintColor: Colors.themeColor,
        tabBarInactiveTintColor: Colors.light.tab_unselect,
        headerShown: false,
      }}>
      <Tab.Screen
        name={Home}
        component={HomePage}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) =>
            TabBarIcon({color, size, name: 'home'}),
        }}
      />
      <Tab.Screen
        name={Question}
        component={QuestionPage}
        options={{
          tabBarLabel: '问答',
          tabBarIcon: ({color, size}) =>
            TabBarIcon({color, size, name: 'chat-question'}),
        }}
      />
      <Tab.Screen
        name={Tree}
        component={TreePage}
        options={{
          tabBarLabel: '体系',
          tabBarIcon: ({color, size}) =>
            TabBarIcon({color, size, name: 'file-tree'}),
        }}
      />
      <Tab.Screen
        name={Mine}
        component={MinePage}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) =>
            TabBarIcon({color, size, name: 'account'}),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainPage;
