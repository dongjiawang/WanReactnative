import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import SplashPage from '../page/splashPage';
import MainPage from '../page/mainPage';
import {RouteProp} from '@react-navigation/native';
import ArticleDetailPage from '../page/articleDetailPage';

/**路由名称 */
export const Splash = 'splash';
export const Main = 'main';
export const Home = 'home';
export const Question = 'question';
export const Tree = 'tree';
export const Mine = 'mine';
export const ArticleDetail = 'articleDetail';

/**路由参数 */
export type RootStackParamList = {
  [Splash]: undefined;
  [Main]: undefined;
  [ArticleDetail]: {link: string};
};

export type NavigateProps<RouteName extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, RouteName>;
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 *
 * @constructor
 *
 * initialRouteName: 初始路由的名称。
 *
 * screenOptions: 用于设置屏幕的默认选项，例如标题、样式等。
 *
 * headerMode: 定义标题栏的显示方式，可以是 'float'、'screen'、'none'。
 *
 * headerShown: 控制是否显示标题栏，默认为 true。
 *
 * headerTitle: 设置标题栏的标题内容，可以是字符串或 React 元素。
 *
 * headerTitleAlign: 标题内容的对齐方式，可以是 'left'、'center'。
 *
 * headerTintColor: 标题栏文字颜色。
 *
 * headerStyle: 自定义标题栏的样式。
 *
 * headerBackTitle: 返回按钮的标题。
 *
 * headerBackTitleVisible: 控制返回按钮的标题是否可见。
 *
 * headerTransparent: 标题栏是否透明。
 *
 * cardStyle: 用于设置卡片容器的样式。
 *
 * cardShadowEnabled: 是否启用卡片容器的投影效果。
 *
 * cardOverlayEnabled: 是否启用卡片叠加效果，通常与透明度一起使用。
 *
 * gestureEnabled: 是否启用手势操作，默认为 true。
 *
 * gestureDirection: 定义手势的方向，可以是 'horizontal'、'vertical'。
 *
 * transitionSpec: 定义页面过渡的自定义动画效果。
 *
 * animationEnabled: 是否启用页面切换动画，默认为 true。
 *
 * animationTypeForReplace: 在页面替换时使用的动画类型，例如 'pop'、'push'。
 *
 * detachInactiveScreens: 是否在页面不活动时卸载屏幕组件，默认为 false。
 *
 *
 */

/**路由表注册 */

const AppRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName={Splash}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={Splash} component={SplashPage} />
      <Stack.Screen name={Main} component={MainPage} />
      <Stack.Screen name={ArticleDetail} component={ArticleDetailPage} />
    </Stack.Navigator>
  );
};

export {AppRouter};
