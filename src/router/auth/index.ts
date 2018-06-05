import * as Router from 'koa-router';

import AuthCtrl from './auth.ctrl';

const authCtrl = new AuthCtrl();

// Path: /api/auth

export class AuthRouter {
	auth: Router = new Router();

	constructor() {
		this.routes();
	}

	routes():void {
		const { auth } = this;
		auth.post('/register/local', authCtrl.localRegister);
		// auth.post('/login/local');
		// auth.get('/exists/:key(email|username)/:value');
		// auth.post('/logout');
	}
}

const authRoute = new AuthRouter();
const auth = authRoute.auth;

export default auth;