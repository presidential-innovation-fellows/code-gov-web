import { browser, by, element } from 'protractor';

describe('AppComponent', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have <home>', () => {
    let subject = element(by.css('home')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });
});
