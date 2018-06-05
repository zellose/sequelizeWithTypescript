import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';

import { sequelize } from 'database';
import sync from 'database/sync';

const app = new Koa();
const router = new Router();

import api from 'router';

export default class Server {
	app: Koa;
	router: Router;

	constructor() {
		this.app = new Koa();
		this.router = new Router();
		this.initializeDB();
		this.routes();
		this.middleware();
	}

	initializeDB(): void {
		sequelize.authenticate().then(
			() => {
				sync();
				console.log(`DB Connection has been established`);
			},
			(err) => {
				console.log(`Unable to connect to the DB ${err}`);
			}
		);
	}

	middleware(): void {
		const { app, router } = this;
		app.use(koaBody({ multipart: true, jsonLimit: '40mb' }));
		app.use(router.routes()).use(router.allowedMethods());
	}

	listen(port: number): void {
		const { app } = this;
		app.listen(port, (): void => {
			console.log(`Server is running, port number is ${port}`);
		});
	}

	routes(): void {
		const { app, router } = this;
		router.use('/api', api.routes());
	}
}