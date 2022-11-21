import { Request, Response } from 'express';
import type { Credentials } from 'google-auth-library';
import GoogleApiService from '../services/google-api.service';
import IController from './types/controller.interface';
import { Routes } from './types/routes.type';
import Console from '../services/log.service';

class AuthController implements IController {

    public path = '/auth';

    userCredential: Credentials | null = null;

    public routes: Routes = [
        {
            path: '/login',
            method: 'GET',
            handler: this.handleLogin.bind(this),
        },
        {
            path: '/oauth2callback',
            method: 'GET',
            handler: this.handleOAuthCallback.bind(this),
        },
    ];

    constructor(private googleApiService: GoogleApiService) {}

    handleLogin(req: Request, res: Response) {
        res.writeHead(301, { 'Location': this.googleApiService.url });
        res.end();
    }

    handleOAuthCallback(req: Request, res: Response) {
        const { error: queryError, code } = req.query;

        if (queryError) {
            Console.logError(queryError);
            return res.status(500).json({ error: queryError });
        }

        this.googleApiService.oauth2Client.getToken(code as string)
            .then(({ tokens }) => {
                this.googleApiService.oauth2Client.setCredentials(tokens);

                /** Save credential to the global variable in case access token was refreshed.
			  * ACTION ITEM: In a production app, you likely want to save the refresh token
			  *              in a secure persistent database instead. */
                this.userCredential = tokens;
                this.googleApiService.youtube.subscriptions.list({ auth: this.googleApiService.oauth2Client, part: [ 'snippet', 'contentDetails' ], mine: true, maxResults: 50 }, (err1, res1) => {
                    if (err1) return Console.logError(`The API returned an error: ${ err1.message }`);
                    const items = res1?.data.items;
                    if (items && items.length) {
                        console.log('Items:', items);
                    } else {
                        console.log('No items found.');
                    }
                });
                res.redirect('/');
            }).catch((error) => {
                Console.logError(error as object);
                res.status(500).json(error);
            });
    }

}

export default AuthController;