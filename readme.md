# 認証機能

このプロジェクトでは、`passport` と `passport-local-mongoose` を使用して認証機能を実装しています。

## 使用しているライブラリ

- `passport`: 認証を簡単にするためのミドルウェア。
- `passport-local-mongoose`: Mongoose 用の Passport プラグインで、ユーザー認証を簡単にします。

## 設定ファイル

### User.js

`User.js` では、ユーザースキーマを定義し、`passport-local-mongoose` プラグインを使用して認証機能を追加しています。

```js
import mongoose from "mongoose";
import { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);
```

このプロジェクトでは、`passport` と `passport-local-mongoose` を使用して認証機能を実装しています。

## 使用しているライブラリ

- `passport`: 認証を簡単にするためのミドルウェア。
- `passport-local-mongoose`: Mongoose 用の Passport プラグインで、ユーザー認証を簡単にします。

## 設定ファイル

### User.js

`User.js` では、ユーザースキーマを定義し、`passport-local-mongoose` プラグインを使用して認証機能を追加しています。

```js
import mongoose from "mongoose";
import { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);
```
