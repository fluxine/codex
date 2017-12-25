/* eslint-disable */
const isProd = process.env.NODE_ENV === 'production';

module.exports = [
    {
        module: 'react',
        entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.'+(isProd ? 'production.min' : 'development')+'.js',
        global: 'React',
    },
    {
        module: 'react-dom',
        entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.'+(isProd ? 'production.min' : 'development')+'.js',
        global: 'ReactDOM',
    },
    {
        module: 'firebase',
        entry: 'https://www.gstatic.com/firebasejs/4.8.1/firebase.js',
        global: 'firebase'
    }
];
