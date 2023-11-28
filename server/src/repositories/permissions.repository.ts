import IPermissions from "../interfaces/permissions.interface";
import Permissions from "../schemas/permissions.schema";

class PermissionsRepository {

    public async getPermissions(): Promise<IPermissions[]> {
        const getPermissions = await Permissions.find().sort({ "timestamp": -1 })
        return getPermissions;
    }

    public async createPermissions(permissions: any): Promise<any> {
        const createPermissions = new Permissions({
            permissionName: permissions.permissionName,
            moduleName: permissions.moduleName,
            // timestamp: new Date(),
        });
        const savedPermissions = await createPermissions.save()
        return savedPermissions;
    }

    public async updatePermissions(permissions: any, permissionId: string): Promise<any> {

        const updatePermissions = await Permissions.findByIdAndUpdate(
            permissionId,
            { $set: permissions },
            { "upsert": true }

        )
        return updatePermissions;
    }

    public async deletePermissions(permissionId: any): Promise<IPermissions | null> {
        const deletePermissions = await Permissions.findByIdAndDelete(permissionId);
        return deletePermissions
    }
}
export default PermissionsRepository