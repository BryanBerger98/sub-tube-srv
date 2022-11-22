import GoogleApiService from '../../../services/google-api.service';
import GetSubscriptionsInteractor from './get-subscriptions.interactor';

class SubscriptionsInteractors {

    getSubscriptionsInteractor = new GetSubscriptionsInteractor(this.googleApiService);
	
    constructor(
		private googleApiService: GoogleApiService
    ) {}

}

export default SubscriptionsInteractors;
