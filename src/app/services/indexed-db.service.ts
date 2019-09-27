import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  private name = 'Tms-db';
  private version = 1;
  public db: IDBDatabase = null;

  constructor(@Inject('DbName') private dbname) {
    this.name = dbname;
  }

  // 打开并创建数据库
  public open(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // 打开indexedDB
      const req = indexedDB.open(this.name, this.version);
      // 打开DB成功后的回调
      req.onsuccess = function(event) {

        console.log(event.target.result);
        this.db = event.target.result;


        resolve();
      }.bind(this);
// 此处说明.bind(this)，是为了把当前类的属性和方法传入req.onsuccess的这个function里。即：.bind(this)的this是指本类WorkIndexedDBService
      // 打开DB失败后的回调
      req.onerror = reject;
      // 打开新的数据库时，会回调此函数，改变name和version均会建立新的DB，所以都会发生此回调。
      req.onupgradeneeded = function(event) {
        // 如果版本升级要记得删除旧的数据库表再建立新的。
        this.db = event.target.result;
        const storeNames = this.db.objectStoreNames;
        if (storeNames && storeNames.length > 0) {
          for (let i = 0 ; i < storeNames.length ; i++) {
            this.db.deleteObjectStore(storeNames[i]);
            console.log('deleteObjectStore', storeNames[i]);
          }
        }
        // 创建数据库表
        this.createViewDB();
      }.bind(this);
    });
  }
  // 数据库初始化处理
  private createDB(): void {
    this.createConfigInfo();
   // this.createStoreUserInfo();
   // this.createStoreOrgInfo();
   // this.createStoreUserOrgInfo();
  }

  // 创建系统配置表及索引
  private createConfigInfo(): void {
    const store = this.db.createObjectStore(
      'ShipPlanItem'
    );
  }
  // 关闭数据库
  public close(): void {
    this.db.close();
  }

  // 删除数据库
  public deleteDB(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // 先关闭连接再删
      this.close();

      let req = indexedDB.deleteDatabase(this.name);

      req.onsuccess = function(event) {
        this.db = null;
        resolve();
      }.bind(this);

      req.onerror = reject;
    });
  }

  // 添加数据
  // 注意：使用事务来做操作比较快。
  public insert(
    storeName: string,
    data: any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {


      const transaction = this.db.transaction(storeName, 'readwrite');

      console.log(transaction);
      const store = transaction.objectStore(storeName);

      const req = store.add(data);

      req.onsuccess = function(event) {
        resolve(req.result);
      };

      req.onerror = reject;
    });
  }
}
