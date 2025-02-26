# :classical_building: @kornsupadej/setting-resolver

![eslint](https://img.shields.io/badge/eslint-v9.x-4b32c3?style=flat-square)
![nodejs](https://img.shields.io/badge/node.js-v18.18.x-green?style=flat-square)
![typescript](https://img.shields.io/badge/typescript-v5.x-3178c6?style=flat-square)

:toolbox: A toolbox for setting up new projects.

## :gear: Installation

```bash
npm i -D @kornsupadej/setting-resolver
```

## :open_book: Usage Example

**ESLint Configuration**

```js
// eslint.config.js
const { resolveSetting } = require("@kornsupadej/setting-resolver")

// For additional setting, `object` can be passed in `settingOptions`
module.exports = resolveConfig(
    // settingSpec: specify return type of setting & project properties
    {
        format: "flat",
        rootDir: __dirname,
        typescript: false,
        prettier: false
    },
    // settingOption: setting type that need to be resolved can be either string | object
    {
        type: "nodejs",
        options: {
            rules: {
                "no-unused-var": "off"
                "no-undef": "off"
            }
        }
    },
    "jest"
)

```

**Prettier Configuration**

```javascript
// prettier.config.js
const {
  resolvePrettierSetting,
} = require('@kornsupadej/setting-resolver/prettier')

// only resolve default setting
module.exports = resolvePrettierSetting()

// add or override default setting
module.exports = resolvePrettierSetting({
  semi: true,
  singleQutoe: false,
})
```
