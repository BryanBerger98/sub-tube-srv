declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
		GOOGLE_AUTH_CLIENT_ID: string;
		GOOGLE_AUTH_CLIENT_SECRET: string;
    }
}