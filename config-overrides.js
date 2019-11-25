const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');

const path = require('path')


function pathFn(pathUrl) {
    return path.join(__dirname, pathUrl)
}

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addWebpackAlias({
        '@': pathFn('./src'),
        'assets': pathFn('./src/assets'),
        'components': pathFn('./src/components'),
        'router': pathFn('./src/router'),
        'utils': pathFn('./src/utils'),
        'views': pathFn('./src/views'),
        'store': pathFn('./src/store')
    })
);