import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {NavigateProps} from '../route/router';
import WebView from 'react-native-webview';
import Colors from '../res/colors';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Bar as ProgressBar} from 'react-native-progress';

const ArticleDetailPage = ({route}: NavigateProps<'articleDetail'>) => {
  const webViewRef = useRef<WebView>(null);
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const {top: statusBarHeight} = useSafeAreaInsets();

  const detailStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors.light.window_background,
    },
    webView: {
      flex: 1,
      width: '100%',
    },
    backButton: {
      position: 'absolute',
      top: statusBarHeight + 10,
      left: 20,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: Colors.themeColor,
      opacity: 0.8,
    },
  });

  const handleNavigationStateChange = (event: {
    canGoBack: boolean | ((prevState: boolean) => boolean);
  }) => {
    setCanGoBack(event.canGoBack);
  };

  const goBack = () => {
    if (webViewRef.current && canGoBack) {
      // 直接调用 goBack() 方法
      webViewRef.current.goBack();
    } else {
      // 如果 WebView 无法返回上一页,就执行导航的返回操作
      navigation.goBack();
    }
  };

  return (
    <View style={detailStyle.container}>
      {/* 仅当 WebView 未加载完成时显示进度条 */}
      {!webViewLoaded && (
        <ProgressBar
          progress={progress}
          color={Colors.themeColor}
          borderWidth={0}
          width={null}
          height={10}
        />
      )}

      <SafeAreaView style={detailStyle.container}>
        <WebView
          style={detailStyle.webView}
          ref={webViewRef}
          source={{uri: route.params.link}}
          allowUniversalAccessFromFileURLs={true}
          allowsInlineMediaPlayback={true}
          scalesPageToFit={true}
          mixedContentMode="always"
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScriptForMainFrameOnly={true}
          onNavigationStateChange={handleNavigationStateChange}
          contentInsetAdjustmentBehavior="automatic"
          onLoadProgress={event => {
            setProgress(event.nativeEvent.progress);
          }}
          onLoadEnd={() => {
            setWebViewLoaded(true);
          }}
        />
        <Pressable onPress={goBack} style={[detailStyle.backButton]}>
          <Ionicons name={'arrow-back'} color="white" size={44} />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default ArticleDetailPage;
