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

## Supported Setting

![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=000)
![typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![nodejs](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Mocha Badge](https://img.shields.io/badge/Mocha-8D6748?logo=mocha&logoColor=fff&style=for-the-badge)
![jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![Vitest Badge](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff&style=for-the-badge)
![Prettier Badge](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge)
