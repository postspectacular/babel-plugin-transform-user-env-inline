# babel-plugin-transform-user-env-inline

[![npm version](https://img.shields.io/npm/v/babel-plugin-transform-user-env-inline.svg)](https://www.npmjs.com/package/babel-plugin-transform-user-env-inline)

Similar to, and based on
[babel-plugin-transform-node-env-inline](https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-node-env-inline),
this plugin inlines user provided environment variables referenced as
`process.env.ENV_VAR_NAME`, and if used as part of a binary expression,
optionally & statically evaluates it and then replaces expression with
result.

## Usage

By default only `NODE_ENV` is enabled for inlining & evaluation, but any
other env vars can be specified via plugin options:

```json
{
    "plugins": [
        [
            "transform-user-env-inline",
            {
                // try to evaluate
                "ASSERTS": true,
                // don't try evaluate
                "API_KEY": false
            }
        ],
    ]
}
```

### Example

Given above config (in `.babelrc`) and following code:

```js
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
process.env.ASSERTS === "1";
process.env.API_KEY === "foo";
```

```bash
NODE_ENV=development \
ASSERTS=1 \
API_KEY=foo \
babel in.js
```

Result:

```
true;
false;
true;
"foo" === "foo"
```

## Authors

Karsten Schmidt, 2020, MIT licensed