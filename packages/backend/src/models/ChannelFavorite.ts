/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { id } from './util/id.ts';
import { MiUser } from './User.ts';
import { MiChannel } from './Channel.ts';

@Entity('channel_favorite')
@Index(['userId', 'channelId'], { unique: true })
export class MiChannelFavorite {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column({
		...id(),
	})
	public channelId: MiChannel['id'];

	@ManyToOne(() => MiChannel, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public channel: MiChannel | null;

	@Index()
	@Column({
		...id(),
	})
	public userId: MiUser['id'];

	@ManyToOne(() => MiUser, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public user: MiUser | null;
}
