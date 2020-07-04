import store from '../store';

import en from '../locales/en-US.json';
import ru from '../locales/ru-RU.json';

const locales = {
  'en-US': en,
  'ru-RU': ru,
};

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'en-US';
  return locales[locale][key] || `Localize error: ${key} is not found`;
}
