const moduleResolver = [
    "module-resolver",
    {
        root: ["./"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            "@": "./src",
        },
    },
]

module.exports = {
    presets: ["module:@react-native/babel-preset"],
    plugins: [moduleResolver],
}
