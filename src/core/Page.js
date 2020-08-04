export class Page {
  constructor(params) {
    console.log('PAGE', this.params);
    this.params = params;
  }

  getRoot() {
    throw new Error('Method getRoot should be implemented');
  }

  afterRender() {

  }

  destroy() {

  }
}
