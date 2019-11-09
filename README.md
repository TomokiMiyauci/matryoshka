# nuxt-template

>Quick start with Vuetify + Hygen + Storybook in Nuxt.js project  
![logo](https://github.com/TomokiMiyauci/nuxt-template/blob/images/logos.png)

## Feature

Generate useful templates to get you started with nuxt projects even faster.
The differences from the "create nuxt-app" command are as follows:  

* Hygen set up
* Storybook set up
* add vscode workspace config
* rewrite eslint config to appropriate
* remove starting components

## Usage

``` bash
# clone this repository
$ git clone https://github.com/TomokiMiyauci/nuxt-template.git

# change directory
$ cd nuxt-template

# initialize
$ ./init
```

## Addons

``` bash
# generate components template used for hygen
$ yarn hygen

# generate vuex template used for hygen
$ yarn hygen:vuex

# serve storybook whih hot reload at localhost:6006
$ yarn storybook

# build storybook for production
$ yarn build-storybook
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
