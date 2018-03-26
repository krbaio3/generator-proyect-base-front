import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { <%- capitalize(componentName) %> } from './<%= componentName %>.component';

describe('<%- capitalize(componentName) %>', () => {
   let component: <%- capitalize(componentName) %>;
  let fixture: ComponentFixture<<%- capitalize(componentName) %>>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [<%- capitalize(componentName) %>],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(<%- capitalize(componentName) %>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create <%- capitalize(componentName) %>', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should create the <%- capitalize(componentName) %>',
    async(() => {
      const fixture = TestBed.createComponent(<%- capitalize(componentName) %>);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});

