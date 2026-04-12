import { Entity } from 'typeorm';
import type { MiUser } from './User.js';

interface Station {
	coreId: string;
	id: string;
	name: string;
	isPrivate: boolean;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
	coordinators: Array<MiUser['id']>;
}

@Entity('station')
export class MiStation implements Station {
	public coreId: string;
	public id: string;
	public name: string;
	public isPrivate: boolean;
	public description: string | null;
	public createdAt: Date;
	public updatedAt: Date;
	public coordinators: Array<MiUser['id']>;
}
