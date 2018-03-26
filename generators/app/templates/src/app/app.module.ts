import { AppConfig } from './app.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserServiceConfig } from './core/service/user-service.config';

/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
	imports: [
		BrowserModule,
		/* Core Module */
		CoreModule.forRoot( new UserServiceConfig('Nguyen Tran') ),
		AppRoutingModule,
	],
	declarations: [AppComponent],
	providers: [{ provide: AppConfig, useValue: process.env.APP_CONFIG }, { provide: APP_BASE_HREF, useValue: '/' }],
	bootstrap: [AppComponent]
})
export class AppModule { }

console.log('jorge');
