const Role = require('./role.model')
const User = require('./user.model')
const Resource = require('./resource.model')
const RoleResourceRelation = require('./role-resource-relation.model')
const UserRoleRelation = require('./user-role-relation.model')
const LoginRecord = require('./login-record.model')

// User.belongsTo(Role)
// Role.hasMany(User)

User.belongsToMany(Role, { through: UserRoleRelation })
Role.belongsToMany(User, { through: UserRoleRelation })

Role.belongsToMany(Resource, { through: RoleResourceRelation })
Resource.belongsToMany(Role, { through: RoleResourceRelation })

User.hasMany(LoginRecord, {
  foreignKey: 'userId'
})

// Resource.sync({
//   // force: true
//   alter: true
// }).then(() => {
//   console.log('check resource table success')
// })
// Role.sync({
//   // force: true
// }).then(() => {
//   console.log('check role table success')
// })
// User.sync({
//   force: true
// }).then(() => {
//   console.log('check user table success')
// })
// UserRoleRelation.sync({
//   // force: true
// }).then(() => {
//   console.log('check user_role_relation table success')
// })
// RoleResourceRelation.sync({
//   // force: true
// }).then(() => {
//   console.log('check role_resource_relation table success')
// })
// LoginRecord.sync({
//   force: true,
//   // alter: true
// }).then(() => {
//   console.log('check login_record table success')
// })
module.exports = {
  Role,
  User,
  Resource,
  RoleResourceRelation,
  UserRoleRelation,
  LoginRecord
}
