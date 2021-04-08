import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// create schema object and define all fields, their types and requirement.
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// method that can be accessed with an instantiated user
userSchema.methods.matchPassword = async function (enteredPassword) {
  // the method compare will compare the plain text password with the one in database that is encrypted
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create model for this schema in DB
const User = mongoose.model('User', userSchema);

// Export it
export default User;
