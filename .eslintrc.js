module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true,
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "globals": {
        // jsx-control-statements
        "If": false,
        "Choose": false,
        "When": false,
        "Otherwise": false,
    },
    "plugins": [
        "react",
        "flowtype"
    ],
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": false
        }
    },
    "rules": {
        "no-debugger": "warn",
        "padded-blocks": ["error", { "classes": "always" }],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-no-undef": ["error", { "allowGlobals": true }],
        "react/jsx-uses-vars": "error",
        "react/jsx-indent": [ "error", 2],
        "react/jsx-indent-props": [ "error", 2],
        "react/jsx-filename-extension": [ "warn", { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/click-events-have-key-events" : "off",
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to", "hrefLeft", "hrefRight" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
        }]
    }
};