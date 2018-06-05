import models from 'database';

interface IUserProfile {
	register(display_name: string): Promise<string>;
}

export default class UserProfileMethods implements IUserProfile {
	UserProfile = models.UserProfile;

	async register(display_name: string): Promise<any> {
		const { UserProfile } = this;
		const userId = await UserProfile.build({
			display_name
		}).save().then(
			data => data.id
		);
		return userId;
	}
}