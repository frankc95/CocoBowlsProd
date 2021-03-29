// Sample user data
// import bcrypt
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    // sample password, with number of rounds. The greater the number the more secure crypting is but also slower to decrypt.
    password: bcrypt.hashSync('123456', 10),
    // In user model, isAdmin field is defined as false by default
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

// export
export default users;
