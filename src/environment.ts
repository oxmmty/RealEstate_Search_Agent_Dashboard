const mode = import.meta.env.MODE;

type EnvironmentType = {
    SERVER_DOMAIN: string;
}

const ENVIRONMENTS: Record<string, EnvironmentType> = {
    development: {
        SERVER_DOMAIN: 'http://127.0.0.1:3000/'
    },
    staging: {
        SERVER_DOMAIN: 'http://127.0.0.1:3000/'
    },
    production: {
        SERVER_DOMAIN: ''
    },
}

const ENVIRONMENT: EnvironmentType = ENVIRONMENTS[mode] || ENVIRONMENTS.local;

export default ENVIRONMENT;