export default {
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected'
  },

  locales: [
    {
      code: 'en',
      iso: 'en',
      file: 'en.json'
    },
    {
      code: 'ja',
      iso: 'ja',
      file: 'ja.json'
    }
  ],
  defaultLocale: 'en',
  lazy: true,
  langDir: 'locales/'
}
