# To run the project

1. Delete package-lock.json
2. Remove firebase dependency from package.json
3. Run following commands
   ```
   $ npm install --build-from-resource
   ```
4. In app.js change:
   ```
   import firebase from 'firebase/app';
   ```
   To
   ```
   import firebase from 'firebase/compat/app';
   ```
5. Run:
    ```
    $ npm install --save firebase
6. To start running the project
    ``` 
    npm start

Additional step:
Run 
```
export NODE_OPTIONS=--openssl-legacy-provider
```