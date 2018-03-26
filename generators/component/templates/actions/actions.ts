import { Action } from '@ngrx/store';
import { <%- capitalize(componentName) %> } from '../models/<%= componentName %>.model';

export const JAVA = 'Java';
export const ANGULAR = 'Angular';
export const MY_ARTICLES = 'Favorite_Articles';

export class JavaArticlesAction implements Action {
  readonly type = JAVA;
}

export class AngularArticlesAction implements Action {
  readonly type = ANGULAR;
}

export class FavoriteArticlesAction implements Action {
  readonly type = MY_ARTICLES;

  constructor(public payload: <%- capitalize(componentName) %>[]) {}
}

export type All = JavaArticlesAction | AngularArticlesAction | FavoriteArticlesAction;
