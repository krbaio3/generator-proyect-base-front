import Vue from 'vue';
import <%= name %> from '@/components/<%= name %>';

describe('<%= name %>.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(<%= name %>);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal(
      'Something'
    );
  });
});
