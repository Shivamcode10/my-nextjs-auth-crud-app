import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// ✅ Interface updated with role
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

// ✅ Schema updated with role
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Hash password before save (FIXED typing)
UserSchema.pre('save', async function (this: IUser) {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ✅ Prevent recompile issue
const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>('User', UserSchema);

export default User;