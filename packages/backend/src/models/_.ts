/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {
	FindOneOptions,
	ObjectLiteral,
	Repository,
} from 'typeorm';
import { MiAbuseReportNotificationRecipient } from '@/models/AbuseReportNotificationRecipient.ts';
import { MiAbuseUserReport } from '@/models/AbuseUserReport.ts';
import { MiAccessToken } from '@/models/AccessToken.ts';
import { MiAd } from '@/models/Ad.ts';
import { MiAnnouncement } from '@/models/Announcement.ts';
import { MiAnnouncementRead } from '@/models/AnnouncementRead.ts';
import { MiAntenna } from '@/models/Antenna.ts';
import { MiApp } from '@/models/App.ts';
import { MiAuthSession } from '@/models/AuthSession.ts';
import { MiAvatarDecoration } from '@/models/AvatarDecoration.ts';
import { MiBlocking } from '@/models/Blocking.ts';
import { MiBubbleGameRecord } from '@/models/BubbleGameRecord.ts';
import { MiChannel } from '@/models/Channel.ts';
import { MiChannelFavorite } from '@/models/ChannelFavorite.ts';
import { MiChannelFollowing } from '@/models/ChannelFollowing.ts';
import { MiChannelMuting } from '@/models/ChannelMuting.ts';
import { MiChatApproval } from '@/models/ChatApproval.ts';
import { MiChatMessage } from '@/models/ChatMessage.ts';
import { MiChatRoom } from '@/models/ChatRoom.ts';
import { MiChatRoomInvitation } from '@/models/ChatRoomInvitation.ts';
import { MiChatRoomMembership } from '@/models/ChatRoomMembership.ts';
import { MiClip } from '@/models/Clip.ts';
import { MiClipFavorite } from '@/models/ClipFavorite.ts';
import { MiClipNote } from '@/models/ClipNote.ts';
import { MiDriveFile } from '@/models/DriveFile.ts';
import { MiDriveFolder } from '@/models/DriveFolder.ts';
import { MiEmoji } from '@/models/Emoji.ts';
import { MiFlash } from '@/models/Flash.ts';
import { MiFlashLike } from '@/models/FlashLike.ts';
import { MiFollowing } from '@/models/Following.ts';
import { MiFollowRequest } from '@/models/FollowRequest.ts';
import { MiGalleryLike } from '@/models/GalleryLike.ts';
import { MiGalleryPost } from '@/models/GalleryPost.ts';
import { MiHashtag } from '@/models/Hashtag.ts';
import { MiInstance } from '@/models/Instance.ts';
import { MiMeta } from '@/models/Meta.ts';
import { MiModerationLog } from '@/models/ModerationLog.ts';
import { MiMuting } from '@/models/Muting.ts';
import { MiNote } from '@/models/Note.ts';
import { MiNoteDraft } from '@/models/NoteDraft.ts';
import { MiNoteFavorite } from '@/models/NoteFavorite.ts';
import { MiNoteReaction } from '@/models/NoteReaction.ts';
import { MiNoteThreadMuting } from '@/models/NoteThreadMuting.ts';
import { MiPage } from '@/models/Page.ts';
import { MiPageLike } from '@/models/PageLike.ts';
import { MiPasswordResetRequest } from '@/models/PasswordResetRequest.ts';
import { MiPoll } from '@/models/Poll.ts';
import { MiPollVote } from '@/models/PollVote.ts';
import { MiPromoNote } from '@/models/PromoNote.ts';
import { MiPromoRead } from '@/models/PromoRead.ts';
import { MiRegistrationTicket } from '@/models/RegistrationTicket.ts';
import { MiRegistryItem } from '@/models/RegistryItem.ts';
import { MiRelay } from '@/models/Relay.ts';
import { MiRenoteMuting } from '@/models/RenoteMuting.ts';
import { MiRetentionAggregation } from '@/models/RetentionAggregation.ts';
import { MiReversiGame } from '@/models/ReversiGame.ts';
import { MiRole } from '@/models/Role.ts';
import { MiRoleAssignment } from '@/models/RoleAssignment.ts';
import { MiSignin } from '@/models/Signin.ts';
import { MiSwSubscription } from '@/models/SwSubscription.ts';
import { MiSystemAccount } from '@/models/SystemAccount.ts';
import { MiSystemWebhook } from '@/models/SystemWebhook.ts';
import { MiUsedUsername } from '@/models/UsedUsername.ts';
import { MiUser } from '@/models/User.ts';
import { MiUserIp } from '@/models/UserIp.ts';
import { MiUserKeypair } from '@/models/UserKeypair.ts';
import { MiUserList } from '@/models/UserList.ts';
import { MiUserListFavorite } from '@/models/UserListFavorite.ts';
import { MiUserListMembership } from '@/models/UserListMembership.ts';
import { MiUserMemo } from '@/models/UserMemo.ts';
import { MiUserNotePining } from '@/models/UserNotePining.ts';
import { MiUserPending } from '@/models/UserPending.ts';
import { MiUserProfile } from '@/models/UserProfile.ts';
import { MiUserPublickey } from '@/models/UserPublickey.ts';
import { MiUserSecurityKey } from '@/models/UserSecurityKey.ts';
import { MiWebhook } from '@/models/Webhook.ts';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.ts';

export interface MiRepository<T extends ObjectLiteral> {
	insertOne(this: Repository<T> & MiRepository<T>, entity: QueryDeepPartialEntity<T>, findOptions?: Pick<FindOneOptions<T>, 'relations'>): Promise<T>;
}

export const miRepository = {
	async insertOne(entity, findOptions?) {
		return await this.insert(entity).then(x => this.findOneOrFail({ where: x.identifiers[0], ...findOptions }));
	},
} satisfies MiRepository<ObjectLiteral>;

export {
	MiAbuseUserReport,
	MiAbuseReportNotificationRecipient,
	MiAccessToken,
	MiAd,
	MiAnnouncement,
	MiAnnouncementRead,
	MiAntenna,
	MiApp,
	MiAvatarDecoration,
	MiAuthSession,
	MiBlocking,
	MiChannelFollowing,
	MiChannelFavorite,
	MiChannelMuting,
	MiClip,
	MiClipNote,
	MiClipFavorite,
	MiDriveFile,
	MiDriveFolder,
	MiEmoji,
	MiFollowing,
	MiFollowRequest,
	MiGalleryLike,
	MiGalleryPost,
	MiHashtag,
	MiInstance,
	MiMeta,
	MiModerationLog,
	MiMuting,
	MiRenoteMuting,
	MiNote,
	MiNoteDraft,
	MiNoteFavorite,
	MiNoteReaction,
	MiNoteThreadMuting,
	MiPage,
	MiPageLike,
	MiPasswordResetRequest,
	MiPoll,
	MiPollVote,
	MiPromoNote,
	MiPromoRead,
	MiRegistrationTicket,
	MiRegistryItem,
	MiRelay,
	MiSignin,
	MiSwSubscription,
	MiSystemAccount,
	MiUsedUsername,
	MiUser,
	MiUserIp,
	MiUserKeypair,
	MiUserList,
	MiUserListFavorite,
	MiUserListMembership,
	MiUserNotePining,
	MiUserPending,
	MiUserProfile,
	MiUserPublickey,
	MiUserSecurityKey,
	MiWebhook,
	MiSystemWebhook,
	MiChannel,
	MiRetentionAggregation,
	MiRole,
	MiRoleAssignment,
	MiFlash,
	MiFlashLike,
	MiUserMemo,
	MiChatMessage,
	MiChatRoom,
	MiChatRoomMembership,
	MiChatRoomInvitation,
	MiChatApproval,
	MiBubbleGameRecord,
	MiReversiGame,
};

export type AbuseUserReportsRepository = Repository<MiAbuseUserReport> & MiRepository<MiAbuseUserReport>;
export type AbuseReportNotificationRecipientRepository =
	Repository<MiAbuseReportNotificationRecipient>
	& MiRepository<MiAbuseReportNotificationRecipient>;
export type AccessTokensRepository = Repository<MiAccessToken> & MiRepository<MiAccessToken>;
export type AdsRepository = Repository<MiAd> & MiRepository<MiAd>;
export type AnnouncementsRepository = Repository<MiAnnouncement> & MiRepository<MiAnnouncement>;
export type AnnouncementReadsRepository = Repository<MiAnnouncementRead> & MiRepository<MiAnnouncementRead>;
export type AntennasRepository = Repository<MiAntenna> & MiRepository<MiAntenna>;
export type AppsRepository = Repository<MiApp> & MiRepository<MiApp>;
export type AvatarDecorationsRepository = Repository<MiAvatarDecoration> & MiRepository<MiAvatarDecoration>;
export type AuthSessionsRepository = Repository<MiAuthSession> & MiRepository<MiAuthSession>;
export type BlockingsRepository = Repository<MiBlocking> & MiRepository<MiBlocking>;
export type ChannelFollowingsRepository = Repository<MiChannelFollowing> & MiRepository<MiChannelFollowing>;
export type ChannelFavoritesRepository = Repository<MiChannelFavorite> & MiRepository<MiChannelFavorite>;
export type ChannelMutingRepository = Repository<MiChannelMuting> & MiRepository<MiChannelMuting>;
export type ClipsRepository = Repository<MiClip> & MiRepository<MiClip>;
export type ClipNotesRepository = Repository<MiClipNote> & MiRepository<MiClipNote>;
export type ClipFavoritesRepository = Repository<MiClipFavorite> & MiRepository<MiClipFavorite>;
export type DriveFilesRepository = Repository<MiDriveFile> & MiRepository<MiDriveFile>;
export type DriveFoldersRepository = Repository<MiDriveFolder> & MiRepository<MiDriveFolder>;
export type EmojisRepository = Repository<MiEmoji> & MiRepository<MiEmoji>;
export type FollowingsRepository = Repository<MiFollowing> & MiRepository<MiFollowing>;
export type FollowRequestsRepository = Repository<MiFollowRequest> & MiRepository<MiFollowRequest>;
export type GalleryLikesRepository = Repository<MiGalleryLike> & MiRepository<MiGalleryLike>;
export type GalleryPostsRepository = Repository<MiGalleryPost> & MiRepository<MiGalleryPost>;
export type HashtagsRepository = Repository<MiHashtag> & MiRepository<MiHashtag>;
export type InstancesRepository = Repository<MiInstance> & MiRepository<MiInstance>;
export type MetasRepository = Repository<MiMeta> & MiRepository<MiMeta>;
export type ModerationLogsRepository = Repository<MiModerationLog> & MiRepository<MiModerationLog>;
export type MutingsRepository = Repository<MiMuting> & MiRepository<MiMuting>;
export type RenoteMutingsRepository = Repository<MiRenoteMuting> & MiRepository<MiRenoteMuting>;
export type NotesRepository = Repository<MiNote> & MiRepository<MiNote>;
export type NoteDraftsRepository = Repository<MiNoteDraft> & MiRepository<MiNoteDraft>;
export type NoteFavoritesRepository = Repository<MiNoteFavorite> & MiRepository<MiNoteFavorite>;
export type NoteReactionsRepository = Repository<MiNoteReaction> & MiRepository<MiNoteReaction>;
export type NoteThreadMutingsRepository = Repository<MiNoteThreadMuting> & MiRepository<MiNoteThreadMuting>;
export type PagesRepository = Repository<MiPage> & MiRepository<MiPage>;
export type PageLikesRepository = Repository<MiPageLike> & MiRepository<MiPageLike>;
export type PasswordResetRequestsRepository = Repository<MiPasswordResetRequest> & MiRepository<MiPasswordResetRequest>;
export type PollsRepository = Repository<MiPoll> & MiRepository<MiPoll>;
export type PollVotesRepository = Repository<MiPollVote> & MiRepository<MiPollVote>;
export type PromoNotesRepository = Repository<MiPromoNote> & MiRepository<MiPromoNote>;
export type PromoReadsRepository = Repository<MiPromoRead> & MiRepository<MiPromoRead>;
export type RegistrationTicketsRepository = Repository<MiRegistrationTicket> & MiRepository<MiRegistrationTicket>;
export type RegistryItemsRepository = Repository<MiRegistryItem> & MiRepository<MiRegistryItem>;
export type RelaysRepository = Repository<MiRelay> & MiRepository<MiRelay>;
export type SigninsRepository = Repository<MiSignin> & MiRepository<MiSignin>;
export type SwSubscriptionsRepository = Repository<MiSwSubscription> & MiRepository<MiSwSubscription>;
export type SystemAccountsRepository = Repository<MiSystemAccount> & MiRepository<MiSystemAccount>;
export type UsedUsernamesRepository = Repository<MiUsedUsername> & MiRepository<MiUsedUsername>;
export type UsersRepository = Repository<MiUser> & MiRepository<MiUser>;
export type UserIpsRepository = Repository<MiUserIp> & MiRepository<MiUserIp>;
export type UserKeypairsRepository = Repository<MiUserKeypair> & MiRepository<MiUserKeypair>;
export type UserListsRepository = Repository<MiUserList> & MiRepository<MiUserList>;
export type UserListFavoritesRepository = Repository<MiUserListFavorite> & MiRepository<MiUserListFavorite>;
export type UserListMembershipsRepository = Repository<MiUserListMembership> & MiRepository<MiUserListMembership>;
export type UserNotePiningsRepository = Repository<MiUserNotePining> & MiRepository<MiUserNotePining>;
export type UserPendingsRepository = Repository<MiUserPending> & MiRepository<MiUserPending>;
export type UserProfilesRepository = Repository<MiUserProfile> & MiRepository<MiUserProfile>;
export type UserPublickeysRepository = Repository<MiUserPublickey> & MiRepository<MiUserPublickey>;
export type UserSecurityKeysRepository = Repository<MiUserSecurityKey> & MiRepository<MiUserSecurityKey>;
export type WebhooksRepository = Repository<MiWebhook> & MiRepository<MiWebhook>;
export type SystemWebhooksRepository = Repository<MiSystemWebhook> & MiRepository<MiWebhook>;
export type ChannelsRepository = Repository<MiChannel> & MiRepository<MiChannel>;
export type RetentionAggregationsRepository = Repository<MiRetentionAggregation> & MiRepository<MiRetentionAggregation>;
export type RolesRepository = Repository<MiRole> & MiRepository<MiRole>;
export type RoleAssignmentsRepository = Repository<MiRoleAssignment> & MiRepository<MiRoleAssignment>;
export type FlashsRepository = Repository<MiFlash> & MiRepository<MiFlash>;
export type FlashLikesRepository = Repository<MiFlashLike> & MiRepository<MiFlashLike>;
export type UserMemoRepository = Repository<MiUserMemo> & MiRepository<MiUserMemo>;
export type ChatMessagesRepository = Repository<MiChatMessage> & MiRepository<MiChatMessage>;
export type ChatRoomsRepository = Repository<MiChatRoom> & MiRepository<MiChatRoom>;
export type ChatRoomMembershipsRepository = Repository<MiChatRoomMembership> & MiRepository<MiChatRoomMembership>;
export type ChatRoomInvitationsRepository = Repository<MiChatRoomInvitation> & MiRepository<MiChatRoomInvitation>;
export type ChatApprovalsRepository = Repository<MiChatApproval> & MiRepository<MiChatApproval>;
export type BubbleGameRecordsRepository = Repository<MiBubbleGameRecord> & MiRepository<MiBubbleGameRecord>;
export type ReversiGamesRepository = Repository<MiReversiGame> & MiRepository<MiReversiGame>;
