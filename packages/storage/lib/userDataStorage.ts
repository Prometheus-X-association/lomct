import { BaseStorage, createStorage, StorageType } from './base';

type UserData =
  | {
      name: string;
      biography?: string;
      primarySourceLink: string;
      actorEmail: string;
      primarySourceBasicAuth: string;
      secondarySourceLink?: string;
      secondarySourceBasicAuth?: string;
      isSecondaryLinkActive?: boolean;
      isAcceptVisibleNameAndBio: boolean;
      isLogged: boolean;
    }
  | undefined;

type UserDataStorage = BaseStorage<UserData> & {
  setUserData: (userData: UserData) => Promise<void>;
};

const storage = createStorage<UserData>('user-storage-key', undefined, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const userDataStorage: UserDataStorage = {
  ...storage,
  // TODO: extends your own methods
  setUserData: async userData => {
    // console.log('setUserData', userData);
    await storage.set(() => {
      return userData;
    });
  },
};
