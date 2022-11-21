import { google } from 'googleapis';
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

}

export default GoogleApiService;