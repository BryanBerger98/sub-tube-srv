import { Request, Response } from 'express';
import type { Credentials } from 'google-auth-library';
import GoogleApiService from '../services/google-api.service';
import IController from './types/controller.interface';
import { Routes } from './types/routes.type';
import Console from '../services/log.service';
import { AuthenticationInteractors } from '../domain/authentication';

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

    constructor(
		private googleApiService: GoogleApiService,
		private authenticationInteractors: AuthenticationInteractors
    ) {}

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

        this.authenticationInteractors.handleOAuthCallbackInteractor.execute(code as string)
            .then(() => {
                return res.redirect('/');
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

}

export default AuthController;