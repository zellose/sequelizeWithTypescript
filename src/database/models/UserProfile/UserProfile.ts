import * as Sequelize from 'sequelize';
import { primaryUUID } from 'lib/common';

interface UserProfileAttributes {
	id?: string;
	display_name?: string;
	thumbnail?: string;
}

type UserProfileInstance = Sequelize.Instance<UserProfileAttributes> & UserProfileAttributes;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
	const attributes: SequelizeAttributes<UserProfileAttributes> = {
		id: primaryUUID,
		display_name: { type: DataTypes.STRING },
		thumbnail: { type: DataTypes.STRING, defaultValue: 'https://s3.ap-northeast-2.amazonaws.com/s3.images.doren.com/marketImages/default_thumbnail.png' }
	};

	const UserProfile = sequelize.define<UserProfileInstance, UserProfileAttributes>('UserProfile', attributes,{
		timestamps: false
	});

	return UserProfile;
};