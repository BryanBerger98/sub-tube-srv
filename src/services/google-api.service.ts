import { OAuth2Client } from 'google-auth-library';
import { google, youtube_v3 } from 'googleapis';
import config from '../environment/env.config';

class GoogleApiService {
	
    public oauth2Client = new google.auth.OAuth2({
        clientId: config.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: config.GOOGLE_AUTH_CLIENT_SECRET,
        redirectUri: config.GOOGLE_AUTH_REDIRECT_DOMAIN ? `${ config.GOOGLE_AUTH_REDIRECT_DOMAIN }/auth/oauth2callback` : '',
    });

    public url = this.oauth2Client.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/youtube',
        ],
        include_granted_scopes: true,
    });

    public youtube = google.youtube('v3');

    private handleError = (error: unknown) => {
        throw error;
    };

    public getToken = async (code: string): Promise<OAuth2Client | undefined> => {
        try {
            const { tokens } = await this.oauth2Client.getToken(code );
            this.oauth2Client.setCredentials(tokens);
            return this.oauth2Client;
        } catch (error) {
            this.handleError(error);
        }
    };

    public getSubscriptions = async (): Promise<youtube_v3.Schema$SubscriptionListResponse | undefined> => {
        try {
            const response = await this.youtube.subscriptions.list({
                auth: this.oauth2Client,
                part: [ 'snippet', 'contentDetails' ],
                mine: true,
                maxResults: 50,
            });
            return response?.data;
        } catch (error) {
            this.handleError(error);
        }
    };

}

export default GoogleApiService;