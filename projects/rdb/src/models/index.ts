import { Blog } from './blog';
import { Note } from './note';
import { User } from './user';

Blog.sync();

User.hasMany(Note);
User.hasMany(Blog);
Blog.belongsTo(User);
Note.belongsTo(User);

Note.sync({ alter: true });
User.sync({ alter: true });
Blog.sync({ alter: true });

export { Blog, Note, User };