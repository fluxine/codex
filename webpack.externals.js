/* eslint-disable */
const isProd = process.env.NODE_ENV === 'production';

function unpkg(module, path, global) {
    const def = {
        module,
        entry: {
            path: `https://unpkg.com/${path}`,
            type: 'js',
        },
    }
    if (global) def.global = global;
    return def;
}

module.exports = [
    {
        module: 'google-roboto',
        entry: {
          path: 'https://fonts.googleapis.com/css?family=Roboto',
          type: 'css',
        },
    },
    {
        module: 'firebase',
        entry: 'https://www.gstatic.com/firebasejs/4.8.1/firebase.js',
        global: 'firebase'
    },
    unpkg('redux', 'redux@^3.7/dist/redux'+(isProd ? '.min' : '')+'.js', 'Redux'),
    unpkg('react', 'react@^16.2.0/umd/react.'+(isProd ? 'production.min' : 'development')+'.js', 'React'),
    unpkg('react-dom', 'react-dom@^16.2.0/umd/react-dom.'+(isProd ? 'production.min' : 'development')+'.js', 'ReactDOM'),
    unpkg('react-redux', 'react-redux@^5.0/dist/react-redux'+(isProd ? '.min' : '')+'.js', 'ReactRedux'),
    unpkg('react-router-dom', 'react-router-dom@^4.2/umd/react-router-dom'+(isProd ? '.min' : '')+'.js', 'ReactRouterDOM'),
    /**
     * For blueprintjs
     */
    unpkg('prop-types', 'prop-types@15.6/prop-types'+(isProd ? '.min' : '')+'.js', 'PropTypes'),
    unpkg('classnames', 'classnames@^2.0.0', 'classNames'),
    unpkg('dom4', 'dom4@^1.8/build/dom4.max.js', 'null'), 
    unpkg('react-transition-group', 'react-transition-group@^2.2.1/dist/react-transition-group'+(isProd ? '.min' : '')+'.js', 'ReactTransitionGroup'),
    unpkg('popper', 'popper.js@^1.12.6/dist/umd/popper'+(isProd ? '.min' : '')+'.js', 'popper'),
    unpkg('react-popper', 'react-popper@~0.7.4/dist/react-popper.min.js', 'ReactPopper'),
    unpkg('@blueprintjs/icons', '@blueprintjs/icons@^2.0.0', 'Blueprint.Icons'),
    unpkg('@blueprintjs/core', '@blueprintjs/core@^2.0.0', 'Blueprint.Core'),
];
