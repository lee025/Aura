module.exports = function(bs) {
  return {
    port: process.env.PORT || 3000,
    // files: ["./**/*.{html,htm,css,js}"],
    server: {
      middleware: {
        // overrides the second middleware default with new settings
        1: require("connect-history-api-fallback")({
          index: "/dist/index.html",
          verbose: true
        })
      }
    }
  };
}