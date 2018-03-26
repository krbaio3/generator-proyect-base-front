import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/<%= componentName %>.actions';
import { JAVA_ARTICLES, ANGULAR_ARTICLES } from '../models/<%= componentName %>.model';
import { <%- capitalize(componentName) %>State } from './app.states';

export const initialState: ArticleState = { articles: [] };

export function reducer(state = initialState, action: fromActions.All): <%- capitalize(componentName) %>State {
  switch (action.type) {
    case fromActions.JAVA: {
      return { articles: JAVA_ARTICLES };
    }
    case fromActions.ANGULAR: {
      return { articles: ANGULAR_ARTICLES };
    }
    case fromActions.MY_ARTICLES: {
      return { articles: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getArticleState = createFeatureSelector<<%- capitalize(componentName) %>State>('articleState');

export const getArticles = createSelector(
  getArticleState,
  (state: <%- capitalize(componentName) %>State) => state.articles
);
