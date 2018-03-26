import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import * as articleReducer from '../reducers/article.reducer';
import * as fromActions from '../actions/article.actions';
import { ArticleState } from '../reducers/app.states';
import { Article, FAVORITE_ARTICLES } from '../models/article';

@Component({
	selector: 'app-<%= componentName %>',
	templateUrl: '<%= componentName %>.component.html',
	styleUrls: ['./<%= componentName %>.component.scss']
})
export class <%- capitalize(componentName) %> implements OnInit {
	articles: Observable<Article[]>;

	constructor(private store: Store<ArticleState>) {
		this.articles = store.select(articleReducer.getArticles);
	}
	ngOnInit() {}

	showJavaArticles(){
		this.store.dispatch(new fromActions.JavaArticlesAction());
	}
	showAngularArticles(){
		this.store.dispatch(new fromActions.AngularArticlesAction());
	}
	showFavoriteArticles(){
		this.store.dispatch(new fromActions.FavoriteArticlesAction(FAVORITE_ARTICLES));
	}
}
