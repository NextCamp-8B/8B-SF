import { translateNewsDict } from '@/constants';
import { News } from '@/types/news';
import { Locale } from '@/types/next-auth';

type Text = 'content' | 'title' | 'summary';

export const getTranslatedNews = (
  news: News,
  locale: Locale,
  text: Text,
) => {
  const translateText = news[translateNewsDict[locale][text]];

  return translateText
    ? translateText
    : news[translateNewsDict['en'][text]];
};

export const hasTranslatedNews = (news: News, locale: Locale) => {
  const translatedContent =
    news[translateNewsDict[locale]['content']];
  return translatedContent ? true : false;
};
