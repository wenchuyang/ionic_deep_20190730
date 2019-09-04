Maybe it caused by version. I had occured the same problem, and here is the steps to fixed it: <br>
1. Modify the file of package.json, change `@ionic-native/sqlite` version to `4.2.1`<br>
2. Remove plugin `cordova-sqlite-storage`, and add `cordova-sqlite-storage@2.0.4`<br>
3. Modify `import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';` to `import { SQLite, SQLiteObject } from '@ionic-native/sqlite';` <br>
Others version may be true, but I haven't try.