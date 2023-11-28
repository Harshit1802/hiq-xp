import IRoles from "../interfaces/roles.interface";
import Roles from "../schemas/roles.schema";

class RolesRepository {

    public async getRoles(): Promise<IRoles[]> {
        const getRoles = await Roles.find().sort({ "timestamp": -1 })
        return getRoles;
    }

    public async createRoles(roles: any): Promise<any> {
        const createRoles = new Roles({
            roleName: roles.roleName,
            permissions: roles.permissions,
            timestamp: new Date(),
        });
        const savedRoles = await createRoles.save()
        return savedRoles;
    }

    public async updateRoles(roles: any, roleId: any): Promise<any> {

        const updateRoles = await Roles.findByIdAndUpdate(
            roleId,
            { $set: roles },
            { "upsert": true }

        ).select({})
        return updateRoles;
    }

    public async deleteRoles(roleId: any): Promise<IRoles | null> {
        const deleteRoles = await Roles.findByIdAndDelete(roleId);
        return deleteRoles
    }
}
export default RolesRepository