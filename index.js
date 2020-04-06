module.exports = function ({ types: t }, opts) {
    opts = Object.assign({ NODE_ENV: true }, opts);
    return {
        name: "transform-user-env-inline",
        visitor: {
            MemberExpression(path) {
                for (let id in opts) {
                    if (path.matchesPattern(`process.env.${id}`)) {
                        path.replaceWith(t.valueToNode(process.env[id]));
                        if (opts[id] && path.parentPath.isBinaryExpression()) {
                            const evaluated = path.parentPath.evaluate();
                            if (evaluated.confident) {
                                path.parentPath.replaceWith(
                                    t.valueToNode(evaluated.value)
                                );
                            }
                        }
                    }
                }
            },
        },
    };
};
