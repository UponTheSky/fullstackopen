import { Session } from './session';
import { Blog } from './blog';
// import { Membership } from './membership';
// import { Note } from './note';
import { ReadingList } from './readinglist';
// import { Team } from './team';
import { User } from './user';

// User.hasMany(Note);
User.hasMany(Blog);
Blog.belongsTo(User);
// Note.belongsTo(User);

User.belongsTo(Session);
Session.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'blogs_listed' });
Blog.belongsToMany(User, { through: ReadingList, as: 'users_listing' });
// User.belongsToMany(Team, { through: Membership });
// Team.belongsToMany(User, { through: Membership });

export { 
  Blog, 
  // Note, 
  User, 
  ReadingList,
  Session
  // Team, 
  // Membership,

};