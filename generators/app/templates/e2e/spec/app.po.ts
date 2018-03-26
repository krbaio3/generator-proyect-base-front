import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('http://angular.github.io/protractor/#/tutorial');
  }

  getParagraphText() {
    return element(by.id('tutorial')).getText();
  }
}
