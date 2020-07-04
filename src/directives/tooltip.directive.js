import M from 'materialize-css';
import localizeFilter from '../filters/localize.filter';

export default {
  bind(el, { value, modifiers }) {
    M.Tooltip.init(el, {
      html: modifiers.nolocales ? value : localizeFilter(value),
    });
  },
  unbind(element) {
    const tooltip = M.Tooltip.getInstance(element);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
