import GoogleApiService from '../../../services/google-api.service';
import { SubscriptionList } from '../types/subscription-list.type';

class GetSubscriptionsInteractor {

    constructor(
		private googleApiService: GoogleApiService
    ) {}

    execute = (): Promise<SubscriptionList | undefined> => {
        return new Promise((resolve, reject) => {
            this.googleApiService.getSubscriptions()
                .then(data => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

}

export default GetSubscriptionsInteractor;