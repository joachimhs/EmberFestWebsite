export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('controller', 'session', 'service:session');
  application.inject('route', 'session', 'service:session');
  application.inject('service:session', 'store', 'service:store');
  application.inject('component:header-comp', 'session', 'service:session');
}

export default {
  name: 'app',
  initialize
};
