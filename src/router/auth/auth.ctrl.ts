import { Context } from 'koa';
import * as Joi from 'joi';

import { UserMethods, UserProfileMethods } from 'database/models';

const User = new UserMethods();
const UserProfile = new UserProfileMethods();

export default class AuthCtrl {
	async localRegister(ctx: Context) {

		interface BodySchema {
			email: string;
			password: string;
			display_name: string;
		}

		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			display_name: Joi.string().required()
		});

		const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

		if(result.error) {
			console.log(`register validator error ${result.error}`);
			ctx.status = 400; // Bas request;
			return;
		}

		try {
			const { email, display_name, password }: BodySchema = ctx.request.body;

			const userProfileId = await UserProfile.register(display_name); // ok
			const user = await User.register({ email, password, userProfileId });

			ctx.body = user;
		} catch(e) {
			console.log(500, e);
		}
	}
}