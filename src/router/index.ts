import * as Router from 'koa-router';

import auth from './auth';
export class ApiRouter {
	api: Router;

	constructor() {
		this.api = new Router();
		this.routes();
	}

	routes(): void {
		const { api } = this;
		api.use('/auth', auth.routes());
	}
}

const apiRoute = new ApiRouter();
const api = apiRoute.api;

export default api;