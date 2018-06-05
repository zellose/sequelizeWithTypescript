import * as Sequelize from 'sequelize';

const { POSTGRELS_PW } = process.env;

const Op = Sequelize.Op;
const operatorsAliases = {
	$eq: Op.eq,
	$ne: Op.ne,
	$gte: Op.gte,
	$gt: Op.gt,
	$lte: Op.lte,
	$lt: Op.lt,
	$not: Op.not,
	$in: Op.in,
	$notIn: Op.notIn,
	$is: Op.is,
	$like: Op.like,
	$notLike: Op.notLike,
	$iLike: Op.iLike,
	$notILike: Op.notILike,
	$regexp: Op.regexp,
	$notRegexp: Op.notRegexp,
	$iRegexp: Op.iRegexp,
	$notIRegexp: Op.notIRegexp,
	$between: Op.between,
	$notBetween: Op.notBetween,
	$overlap: Op.overlap,
	$contains: Op.contains,
	$contained: Op.contained,
	$adjacent: Op.adjacent,
	$strictLeft: Op.strictLeft,
	$strictRight: Op.strictRight,
	$noExtendRight: Op.noExtendRight,
	$noExtendLeft: Op.noExtendLeft,
	$and: Op.and,
	$or: Op.or,
	$any: Op.any,
	$all: Op.all,
	$values: Op.values,
	$col: Op.col
};

import { 
	User,
	UserProfile 
} from './models';

export const sequelize = new Sequelize('reactchat', 'postgres', POSTGRELS_PW!, {
	dialect: 'postgres',
	logging: false,
	operatorsAliases
});

interface IModelSchema {
	UserProfile: any;
	User: any;
}

const ModelSchema = {
	UserProfile,
	User
};

function createDB (ModelSchema: IModelSchema) {
	const db = {
		Sequelize,
		sequelize,
		User: User(sequelize, Sequelize),
		UserProfile: UserProfile(sequelize, Sequelize)
	};
	
	Object.values(db).forEach((model: any) => {
		if (model.associate) {
			model.associate(db);
		}
	});
	return db;
}

const models = createDB(ModelSchema);

export default models;