export function getBaseUrl() {
    const environment = import.meta.env.VITE_APP_ENVIRONMENT || "local";
    try {
      switch (environment) {
        case "local":
          return import.meta.env.VITE_APP_LOCAL_API_URL;
        case "production":
          return import.meta.env.VITE_APP_PRODUCTION_API_URL;
        case "staging":
          return import.meta.env.VITE_APP_STAGING_API_URL;
        default:
          throw new Error(`Invalid environment: ${environment}`);
      }
    } catch (err) {
      console.log(err);
    }
  }