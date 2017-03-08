const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

let ENV = process.env.npm_lifecycle_event;
let isWatch = ENV === 'watch';

let config = {
  entry: {
    'main': './client/entry/main.ts',
    'styles': './client/entry/styles.ts',
    'vendor-ng': './client/entry/vendor-ng.ts',
    'vendor': './client/entry/vendor.ts',
    'polyfills': './client/entry/polyfills.ts'
  },
  output: {
    path: __dirname + '/public/assets',
    publicPath: '/assets',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Startup'
  },
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css', '.scss', '.xlf', 'json'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.(html|xlf)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: [/style\.scss$/],
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.scss$/,
        include: [/style\.scss$/],
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?mimetype=image/svg+xml'
      },
      {
        test: /\.(woff(\d+)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?removeComments=true',
          'angular2-template-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor-ng', 'vendor'].reverse()
    }),
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      './angular'
    )
  ],
  performance: {
    hints: false
  }
};

let configWatch = {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '!/assets/**': {
        target: 'http://localhost:8081',
        xfwd: true
      }
    }
  }
};

let configProd = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};

function mergedConfig(env) {
  if (isWatch) {
    return merge(config, configWatch);
  } else {
    return merge(config, configProd);
  }
}

module.exports = function(env) {
  return mergedConfig(env);
};
