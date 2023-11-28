import { Permission, Role } from "../schemas/role-permission.schema";
import mongoose from "mongoose";

// Creating a new permission
const newPermission = new Permission({
 permissionName: 'can_view_reports'
});
newPermission.save();

// Creating a new role with permissions
const newRole = new Role({
  roleName: 'admin',
  permissions: [newPermission._id]
});
newRole.save();

// Adding more permissions to an existing role
const additionalPermission = new Permission({
  name: 'can_manage_users'
});
additionalPermission.save();

const existingRole = await Role.findOne({ roleName: 'admin' });
existingRole.permissions.push(additionalPermission._id);
existingRole.save();