///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { environment } from '../../environments/environment';

interface StorageInterface {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, data: string): void;
}

export class BaseStorageService {
  protected storage: StorageInterface;

  public setItem(key: string, value: any): void {
    this.storage.setItem(this.getKey(key), JSON.stringify(value));
  }

  public getItem(key: string): any {
    return JSON.parse(this.storage.getItem(this.getKey(key)));
  }

  public removeItem(key): void {
    this.storage.removeItem(this.getKey(key));
  }

  private getKey(key: string): string {
    return `$kuib.${environment.appName}.${key}.${environment.appId}`;
  }
}
