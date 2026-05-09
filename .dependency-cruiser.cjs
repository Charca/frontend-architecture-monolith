/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-cross-module-dependency",
      comment:
        "Feature modules can only depend on themselves, shared, or authentication.",
      severity: "error",
      from: {
        path: "^src/modules/(?!authentication/)([^/]+)/",
      },
      to: {
        path: "^src/modules/(?!authentication/)[^/]+/",
        pathNot: "^src/modules/$1/",
      },
    },
    {
      name: "no-platform-to-feature",
      comment:
        "Shared and authentication are platform concerns and must not import feature modules.",
      severity: "error",
      from: {
        path: "^src/(shared|modules/authentication)/",
      },
      to: {
        path: "^src/modules/(?!authentication/)[^/]+/",
      },
    },
  ],
  options: {
    includeOnly: "^src",
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.json",
    },
    doNotFollow: {
      path: "node_modules",
    },
    exclude: "node_modules|dist",
  },
};
