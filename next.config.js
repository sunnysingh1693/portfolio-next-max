const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      future: {
        webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
        // Looks like backward compatibility approach.
      },
      webpack(config) {
        config.resolve.fallback = {
          ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
          // by next.js will be dropped. Doesn't make much sense, but how it is
          fs: false, // the solution
        };

        return config;
      },
      env: {
        mongodb_username: 'neo',
        mongodb_password: '0pYJ2XyQhpVUzmvp',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'portfolio-dev',
      }
    }
  }

  return {
    reactStrictMode: true,
    future: {
      webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
      // Looks like backward compatibility approach.
    },
    webpack(config) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
        fs: false, // the solution
      };

      return config;
    },
    env: {
      mongodb_username: 'neo',
      mongodb_password: '0pYJ2XyQhpVUzmvp',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'portfolio',
    }
  }
}
