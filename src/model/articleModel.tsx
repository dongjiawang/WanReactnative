import Colors from '../res/colors';

export interface ArticleListModel {
  curPage: number;
  datas: ArticleModel[];
  over: boolean;
  pageCount: number;
  size: number;
  total: number;
}

export interface ArticleModel {
  id: number;
  originId: number;
  apkLink: string;
  audit: number;
  author: string;
  chapterId: number;
  chapterName: string;
  superChapterName: string;
  collect: boolean;
  courseId: number;
  desc: string;
  fresh: boolean;
  link: string;
  title: string;
  tags: ArticleTagModel[];
  shareUser: string;
  niceDate: string;
}

export interface ArticleTagModel {
  name: string;
  url: string;
}

export function getArticleAuthor(article: ArticleModel): string {
  if (article.author.length > 0) {
    return article.author;
  }
  return article.shareUser;
}

export function getArticleChapter(article: ArticleModel): string {
  let chapter = article.chapterName;
  if (article.superChapterName) {
    chapter = article.superChapterName + ' • ' + chapter;
  }
  return chapter;
}

export function getTagColor(tag: ArticleTagModel): string {
  switch (tag.name) {
    case '置顶':
      return Colors.red;
    case '本站发布':
      return Colors.blue;
    case '问答':
      return Colors.cyan;
    case '公众号':
      return Colors.green;
    case '项目':
      return Colors.teal;
    default:
      return Colors.themeColor;
  }
}
