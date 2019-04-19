/**
 * http component组件
 */
class HttpPlugin {
  constructor() {
    this.components = `${__dirname}/lib/components/`;
    this.beforeFilters = [];
    this.afterFilters = [];
  }

  filter(filter) {
    if (filter.before) {
      this.beforeFilters.push(filter.before.bind(filter));
    }
    if (filter.after) {
      this.afterFilters.push(filter.after.bind(filter));
    }
  }

  beforeFilter(filter) {
    this.beforeFilters.push(filter);
  }

  afterFilter(filter) {
    this.afterFilters.push(filter);
  }
}

module.exports = new HttpPlugin();
