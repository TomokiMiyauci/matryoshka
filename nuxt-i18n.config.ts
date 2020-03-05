export default {
  detectBrowserLanguage: {
    useCookie: false
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
