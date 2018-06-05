import * as Sequelize from 'sequelize';
import { primaryUUID } from 'lib/common';

interface UserAttributes {
	id?: string;
	email: string;
	password?: string;
	fk_userProfile_id?: string;
}

interface UserInterface {
	id?: string;
	email?: string;
	password?: string;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
	const attributes: SequelizeAttributes<UserAttributes> = {
		id: primaryUUID,
		fk_userProfile_id: DataTypes.UUID,
		email: { type: DataTypes.STRING },
		password: { type: DataTypes.STRING }
	};

	const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);
	
	User.associate = (models: any) => {
		User.belongsTo(models.UserProfile, { foreignKey: 'fk_userProfile_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); 
	};

	return User;
};