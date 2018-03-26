import { <%- capitalize(componentName) %> } from '../models/<%= componentName %>.model';

export interface AppState {
  articleState: <%- capitalize(componentName) %>State;
}

export interface <%- capitalize(componentName) %>State {
  articles: <%- capitalize(componentName) %>[];
}
