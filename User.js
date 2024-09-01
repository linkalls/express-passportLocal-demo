import mongoose from "mongoose"
import { Schema } from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new Schema( //* かってにusername,passwordを持たせる機能がpassportLocalMongooseにある
  {
    username: {
      type: String, 
      required: true,
      unique: true
    }
  }
)

userSchema.plugin(passportLocalMongoose) //* ここで連携させている

export const User = mongoose.model("User", userSchema) //* ここでUserモデルを作成している