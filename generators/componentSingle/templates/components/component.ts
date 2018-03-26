import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-<%= componentName %>',
	templateUrl: './<%= componentName %>.component.html',
	styleUrls: ['./<%= componentName %>.component.scss']
})
export class <%- capitalize(componentName) %> implements OnInit {

	constructor() {}

	ngOnInit() {}

}