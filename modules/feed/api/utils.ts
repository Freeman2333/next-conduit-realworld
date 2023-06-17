import { Drafted } from "immer/dist/internal";
import { RootState } from "@/store/store";
import { FeedArticle, GlobalFeedInDTO } from "./dto/global-feed.in";
import { SingleArticleInDTO } from "@modules/feed/api/dto/single-article.in";
import { feedApi, FeedData } from "@modules/feed/api/repository";

export const transformResponse = (response: GlobalFeedInDTO) => {
  return {
    articles: response.articles || [],
    articlesCount: response.articlesCount || 0,
  };
};

const updateFeed = <Q>(
  feedKey: string,
  data: { article: FeedArticle },
  feedKeys: string[],
  state: RootState,
  dispatch: any,
  feedApi: any
) => {
  for (
    let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
    i < feedKeys.length;
    i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
  ) {
    if (!key.startsWith(feedKey)) {
      continue;
    }

    dispatch(
      feedApi.util.updateQueryData(
        feedKey,
        queryItem!.originalArgs as Q,
        (draft: Drafted<FeedData> | Drafted<SingleArticleInDTO>) => {
          if ("articles" in draft) {
            const updateId = draft.articles.findIndex(
              (article) => article.slug === data.article.slug
            );

            if (updateId >= 0) {
              draft.articles[updateId] = data.article;
            }
          } else {
            draft.article.favorited = data.article.favorited;
            draft.article.favoritesCount = data.article.favoritesCount;
            draft.article.tagList = data.article.tagList;
          }
        }
      )
    );
  }
};

const updateProfile = <Q>(
  feedKey: string,
  data: { profile: any },
  feedKeys: string[],
  state: RootState,
  dispatch: any
) => {
  for (
    let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
    i < feedKeys.length;
    i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
  ) {
    if (!key.startsWith(feedKey)) {
      continue;
    }

    dispatch(
      feedApi.util.updateQueryData(
        feedKey as any,
        queryItem!.originalArgs as Q,
        (draft) => {
          (draft as Drafted<SingleArticleInDTO>).article.author.following =
            data.profile.following;
        }
      )
    );
  }
};

export const replaceCachedArticle = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  feedApi: any
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);

    updateFeed("getGlobalFeed", data, feedKeys, state, dispatch, feedApi);
    updateFeed("getProfileFeed", data, feedKeys, state, dispatch, feedApi);
    updateFeed("getArticle", data, feedKeys, state, dispatch, feedApi);
  } catch (e) {}
};

export const replacesCachedProfileInArticle = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);

    updateProfile("getArticle", data, feedKeys, state, dispatch);
  } catch (e) {}
};

export const addNewArticletToCache = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);
    const feedKey = "getGlobalFeed";

    for (
      let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
      i < feedKeys.length;
      i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
    ) {
      if (!key.startsWith(feedKey)) {
        continue;
      }

      dispatch(
        feedApi.util.updateQueryData(
          feedKey as any,
          queryItem!.originalArgs,
          (draft) => {
            const original = draft as Drafted<any>;

            original.articles.unshift(data.article);
          }
        )
      );
    }
  } catch (e) {}
};

export const addNewCommentToCache = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);
    const feedKey = "getComments";

    for (
      let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
      i < feedKeys.length;
      i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
    ) {
      if (!key.startsWith(feedKey)) {
        continue;
      }

      dispatch(
        feedApi.util.updateQueryData(
          feedKey as any,
          queryItem!.originalArgs,
          (draft) => {
            const original = draft as Drafted<any>;

            original.comments.unshift(data.comment);
          }
        )
      );
    }
  } catch (e) {}
};

export const removeCommentFromCache = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  meta: any
) => {
  const state = getState() as RootState;

  try {
    await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);
    const feedKey = "getComments";

    for (
      let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
      i < feedKeys.length;
      i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
    ) {
      if (!key.startsWith(feedKey)) {
        continue;
      }

      dispatch(
        feedApi.util.updateQueryData(
          feedKey as any,
          queryItem!.originalArgs,
          (draft) => {
            const original = draft as any;

            original.comments = original.comments.filter(
              (comment) => comment.id !== meta.id
            );
          }
        )
      );
    }
  } catch (e) {}
};

export const removeArticleFromCache = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  meta: any
) => {
  const state = getState() as RootState;

  try {
    await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);
    const feedKey = "getGlobalFeed";

    for (
      let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
      i < feedKeys.length;
      i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
    ) {
      if (!key.startsWith(feedKey)) {
        continue;
      }

      dispatch(
        feedApi.util.updateQueryData(
          feedKey as any,
          queryItem!.originalArgs,
          (draft) => {
            const original = draft as any;

            original.articles = original.articles.filter(
              (article) => article.slug !== meta.articleSlug
            );
          }
        )
      );
    }
  } catch (e) {}
};
