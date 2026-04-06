export interface MixUser {
	id: string;

	updatedAt: Date | null;

	lastFetchedAt: Date | null;

	lastActiveDate: Date | null;

	hideOnlineStatus: boolean;

	username: string;

	usernameLower: string;

	name: string | null;
}
