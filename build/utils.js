'use strict'
import path from 'path';
import config from '../config/index.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import packageConfig from '../package.json' assert { type: 'json' }

export function assetsPath (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

export function cssLoaders (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      plugins: () => [
        autoprefixer({
          browsers: ['last 2 versions'],
        }),
      ],
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) { // eslint-disable-line no-unused-vars
    const loaders = []

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }

    loaders.push(cssLoader)

    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return loaders
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    scss: generateLoaders('sass', { // This will use sass-loader if it's installed
      additionalData: "@import 'src/styles/variables/index';",
    }),
  }
}

// Generate loaders for standalone style files (outside of .vue)
export function styleLoaders (options) {
  const output = []
  const loaders = cssLoaders(options)
 
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

export const createNotifierCallback = () => {
  const notifier = import('node-notifier') // eslint-disable-line @typescript-eslint/no-var-requires

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
    })
  }
}
