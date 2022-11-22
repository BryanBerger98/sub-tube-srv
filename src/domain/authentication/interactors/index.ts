import GoogleApiService from '../../../services/google-api.service';
import HandleOAuthCallbackInteractor from './handle-oauth-callback.interactor';

class AuthenticationInteractors {

    handleOAuthCallbackInteractor = new HandleOAuthCallbackInteractor(this.googleApiService);
	
    constructor(
		private googleApiService: GoogleApiService
    ) {}

}

export default AuthenticationInteractors;
