import React from 'react';
import {
  ArticleModel,
  getArticleAuthor,
  getArticleChapter,
  getTagColor,
} from '../model/articleModel';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../res/colors';
import {Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';

const ArticleItemComponent: React.FC<{
  article: ArticleModel;
  onArticlePress: () => void;
  onCollectPress: () => void;
}> = ({article, onArticlePress, onCollectPress}) => {
  return (
    <Pressable onPress={onArticlePress}>
      <View style={articleItemStyle.container}>
        {/* 第一部分，显示： 新 标识、作者、日期 */}
        <View style={articleItemStyle.topRow}>
          {article.fresh ? (
            <Text style={articleItemStyle.fresh}>新</Text>
          ) : null}
          <Text style={articleItemStyle.author}>
            {getArticleAuthor(article)}
          </Text>
          {/* 根据标签数量创建多个 text */}
          {article.tags.map((tag, index) => (
            <Text
              key={index}
              style={[
                articleItemStyle.tag,
                {color: getTagColor(tag), borderColor: getTagColor(tag)},
              ]}>
              {tag.name}
            </Text>
          ))}
          <Text style={articleItemStyle.date}>{article.niceDate}</Text>
        </View>
        {/* 第二部分，显示： 标题或简介 */}
        <Text
          style={articleItemStyle.title}
          numberOfLines={2}
          ellipsizeMode="tail">
          {article.title}
        </Text>
        {article.desc ? (
          <Text
            style={articleItemStyle.desc}
            numberOfLines={2}
            ellipsizeMode="tail">
            {article.desc}
          </Text>
        ) : null}

        {/* 第三部分，显示： 章节 收藏 删除等 */}
        <View style={articleItemStyle.BottomRow}>
          <Text style={articleItemStyle.chapter}>
            {getArticleChapter(article)}
          </Text>
          <Pressable onPress={onCollectPress}>
            <Ionicons
              name={article.collect ? 'heart' : 'heart-outline'}
              color={Colors.red}
              size={30}
            />
          </Pressable>
        </View>
        <Divider style={articleItemStyle.divider} />
      </View>
    </Pressable>
  );
};

const articleItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 16,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  BottomRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingTop: 5,
  },
  fresh: {
    fontSize: 10,
    color: Colors.themeColor,
    paddingRight: 8,
  },
  author: {
    fontSize: 12,
    paddingRight: 8,
    color: Colors.light.text_h1,
  },
  tag: {
    fontSize: 10,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: 2,
    paddingTop: 1,
    paddingRight: 2,
    paddingBottom: 1,
  },
  date: {
    fontSize: 12,
    color: Colors.light.text_h2,
    textAlign: 'right',
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.light.text_h1,
    paddingTop: 10,
    paddingBottom: 5,
  },
  desc: {
    fontSize: 14,
    color: Colors.light.text_h2,
    overflow: 'visible',
  },
  chapter: {
    fontSize: 12,
    color: Colors.light.text_h2,
    paddingTop: 5,
    paddingBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    color: 'transparent',
    paddingTop: 5,
  },
});

export default ArticleItemComponent;
