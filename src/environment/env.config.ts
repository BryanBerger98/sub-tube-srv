import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

type Env = {
    PORT?: number,
	GOOGLE_AUTH_CLIENT_ID?: string;
    GOOGLE_AUTH_CLIENT_SECRET?: string;
	GOOGLE_AUTH_REDIRECT_DOMAIN?: string;
}

type Config = Env;

const getConfig = (): Env => {
    return {
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
        GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        GOOGLE_AUTH_REDIRECT_DOMAIN: process.env.GOOGLE_AUTH_REDIRECT_DOMAIN,
    };
};

const getSanitzedConfig = (config: Env): Config => {
    for (const [ key, value ] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${ key } in .env file`);
        }
    }
    return config ;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

