import { Request, Response } from 'express';
import GoogleApiService from '../services/google-api.service';
import Console from '../services/log.service';
import IController from './types/controller.interface';
import { Routes } from './types/routes.type';

class SubscriptionsController implements IController {

    public path = '/subscriptions';
    public routes: Routes = [
        {
            path: '/list',
            method: 'GET',
            handler: this.getSubscriptions.bind(this),
        },
    ];

    constructor(private googleApiService: GoogleApiService) {}

    getSubscriptions(req: Request, res: Response) {
        this.googleApiService.youtube.subscriptions.list({ auth: this.googleApiService.oauth2Client, part: [ 'snippet' ], maxResults: 50 })
            .then(response => {
                const items = response?.data.items;
                if (items && items.length) {
                    Console.logMessage('Items:');
                    Console.logMessage(items as object);
                } else {
                    Console.logMessage('No items found.');
                }
            }).catch((error) => {
                const err = <Error>error;
                Console.logError(`The API returned an error: ${ err.message }`);

            });
        res.send('Subscriptions');
    }

}

export default SubscriptionsController;