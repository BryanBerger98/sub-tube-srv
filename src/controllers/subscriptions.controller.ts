import { Request, Response } from 'express';
import { SubscriptionsInteractors } from '../domain/subscriptions';
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

    constructor(
		private googleApiService: GoogleApiService,
		private subscriptionsInteractors: SubscriptionsInteractors
    ) {}

    getSubscriptions(req: Request, res: Response) {
        this.subscriptionsInteractors.getSubscriptionsInteractor.execute()
            .then((subscriptionsData) => {
                res.status(200).json(subscriptionsData);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }
}

export default SubscriptionsController;