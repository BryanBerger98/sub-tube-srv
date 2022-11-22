import App from './app';
import { AuthController, MainController, SubscriptionsController } from './controllers';
import { AuthenticationInteractors } from './domain/authentication';
import { SubscriptionsInteractors } from './domain/subscriptions';
import config from './environment/env.config';
import GoogleApiService from './services/google-api.service';

const googleApiService = new GoogleApiService();
const authenticationInteractors = new AuthenticationInteractors(googleApiService);
const subscriptionsInteractors = new SubscriptionsInteractors(googleApiService);

const app = new App({
    port: config.PORT,
    controllers: [
        new MainController(),
        new AuthController(googleApiService, authenticationInteractors),
        new SubscriptionsController(googleApiService, subscriptionsInteractors),
    ],
});

app.start();