import GoogleApiService from '../../../services/google-api.service';

class HandleOAuthCallbackInteractor {

    constructor(
		private googleApiService: GoogleApiService
    ) {}

    execute(code: string) {
        return this.googleApiService.getToken(code);
    }
}

export default HandleOAuthCallbackInteractor;