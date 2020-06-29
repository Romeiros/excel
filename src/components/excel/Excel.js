import {$} from '../../core/dom';

export class Excel {
  constructor(selector, options) {
    console.log('EXCEL)INIT');
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    console.log(this.components);

    this.components = this.components.map((Component) => {
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    console.log(this.$el);
    this.$el.append(this.getRoot().$el);

    this.components.forEach((component) => {
      component.init();
    });
  }
}
