module.exports = {
  ...require("eslint-config-custom/eslint-library"),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
