import { IStorageProvider } from '@shared/providers/StorageProvider/models';

class MockStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const index = this.storage.findIndex((sf) => sf === file);

    this.storage.splice(index, 1);
  }
}

export default MockStorageProvider;
