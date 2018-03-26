export interface <%- capitalize(componentName) %> {
  id: number;
  title: string;
  category: string;
}

export const JAVA_ARTICLES: <%- capitalize(componentName) %>[] = [
    {id: 1, title: 'Java Article 1', category: 'Java'},
    {id: 2, title: 'Java Article 2', category: 'Java'},
]
export const ANGULAR_ARTICLES: <%- capitalize(componentName) %>[] = [
    {id: 1, title: 'Angular Article 1', category: 'Angular'},
    {id: 2, title: 'Angular Article 2', category: 'Angular'},
]
export const FAVORITE_ARTICLES: <%- capitalize(componentName) %>[] = [
    {id: 1, title: 'Java Article 1', category: 'Java'},
    {id: 2, title: 'Angular Article 2', category: 'Angular'}
]