import {View, StyleSheet, RefreshControl} from 'react-native';
import TitleBar from '../../component/TitleBar';
import PageLoading, {LoadState} from '../../component/PageLoading';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {ArticleModel} from '../../model/articleModel';
import CommonFooter from '../../component/CommonFooter';
import ArticleItemComponent from '../../component/ArticleItemComponent';
import {getHotArticleList} from '../../network/apiService';
import GlobalStore from '../../store/GlobalStore';
import {useNavigation} from '@react-navigation/native';
import LogUtil from '../../utils/LogUtil';
import {ArticleDetail} from '../../route/router';

const HomePage = () => {
  const [viewState, setViewState] = useState(LoadState.LOADING);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<ArticleModel[]>([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigation = useNavigation();

  const loadData = async () => {
    if (dataList.length === 0) {
      GlobalStore.setLoading(true);
    }
    try {
      const data = await loadDataByPage(0);
      GlobalStore.setLoading(false);
      setDataList(data.datas);
      setViewState(
        data.datas.length === 0 ? LoadState.EMPTY : LoadState.SUCCESS,
      );
      setNextPage(data.datas.length < data.total ? 1 : 0);
      setHasMore(data.datas.length < data.total);
    } catch (error) {
      if (dataList.length === 0) {
        setViewState(LoadState.FAIL);
      }
      GlobalStore.setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (hasMore && !loading) {
      setLoading(true);
      try {
        const data = await loadDataByPage(nextPage);
        setDataList(prevDataList => [...prevDataList, ...data.datas]);
        if (dataList.length < data.total) {
          setNextPage(prevNextPage => prevNextPage + 1);
          setHasMore(true);
        } else {
          setNextPage(1);
          setHasMore(false);
        }
      } catch (error) {
        // 处理错误
      } finally {
        setLoading(false);
      }
    }
  };

  const loadDataByPage = async (page: number) => {
    const articleResponse = (await getHotArticleList(page)).data;
    if (articleResponse) {
      return Promise.resolve(articleResponse);
    } else {
      return Promise.reject();
    }
  };

  const articlePress = (article: ArticleModel) => {
    // @ts-expect-error
    navigation.navigate(ArticleDetail, {link: article.link});
  };

  const articleCollect = (article: ArticleModel) => {
    LogUtil.info(article.niceDate);
  };

  return (
    <View style={styles.container}>
      <TitleBar title="热门博文" showBackIcon={false} />
      <PageLoading loadingState={viewState} onReload={loadData}>
        <FlatList
          data={dataList}
          renderItem={({item}) => (
            <ArticleItemComponent
              article={item}
              onArticlePress={() => articlePress(item)}
              onCollectPress={() => articleCollect(item)}
            />
          )}
          keyExtractor={(item, index) => `${item.id} + ${index}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          ListFooterComponent={<CommonFooter loading={loading} />}
        />
      </PageLoading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
