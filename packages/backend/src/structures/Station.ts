/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MiUser } from "../models/_.js";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Station {

	@PrimaryGeneratedColumn()
	public id!: number;

	@ManyToOne(() => MiUser, {
			onDelete: 'SET NULL',
		})
	@JoinColumn()
	public ownerId: MiUser['id'] | null;

	@Column({type: 'string'})
	public name: string;

	constructor(name:string) {
		this.name = name;
	}
}
