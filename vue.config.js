const path = require("path");

module.exports = {
	transpileDependencies: ["vuetify"],
	lintOnSave: false,
	outputDir: path.resolve(path.join(__dirname, "build")),
	productionSourceMap: false,
	css: {
		extract: { ignoreOrder: true }
		// loaderOptions: {
		//   sass: {
		//     additionalData: `@import "@/assets/scss/style.scss"`,
		//   },
		// },
	},
	publicPath: "/",
	configureWebpack: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src/"),
				"@component": path.resolve(__dirname, "src/components"),
				"@views": path.resolve(__dirname, "src/views")
			}
		},
		performance: {
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		},
		optimization: {
			splitChunks: {
				chunks: "async",
				minSize: 10000,
				maxSize: 250000,
				minChunks: 1,
				maxAsyncRequests: 30,
				maxInitialRequests: 30,
				enforceSizeThreshold: 50000,
				cacheGroups: {
					defaultVendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						reuseExistingChunk: true
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true
					}
				}
			}
		}
	}
};
