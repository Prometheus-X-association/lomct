import { BaseStorage, createStorage, StorageType } from './base';

type SuggestEditData =
  | {
      title: string;
      bloom: string;
      level: string;
      license: string;
      type: string;
      keywords: string;
      language: string;
      hours: string;
      minutes: string;
      provider: string;
      author: string;
      publisher: string;
      description: string;
    }
  | undefined;

type SuggestEditDataStorage = BaseStorage<SuggestEditData> & {
  setSuggestEditData: (suggestEditData: SuggestEditData) => Promise<void>;
  removeEditDataStorage: () => void;
};

const storage = createStorage<SuggestEditData>('suggest-edit-storage-key', undefined, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const suggestEditDataStorage: SuggestEditDataStorage = {
  ...storage,
  // TODO: extends your own methods
  setSuggestEditData: async suggestEditData => {
    await storage.set(() => {
      return suggestEditData;
    });
  },
  removeEditDataStorage: async () => {
    storage.remove();
  },
};
