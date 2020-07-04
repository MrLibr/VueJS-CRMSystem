import M from 'materialize-css';
import localizeFilter from '../filters/localize.filter';

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, optional) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$message = (message) => {
      M.toast({ html: message });
    };
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$error = (message) => {
      M.toast({ html: `${localizeFilter('Error')} ${message}` });
    };
  },
};
