import PermissionsRepository from "../repositories/permissions.repository";

class PermissionsService {
    private permissionsRepository: PermissionsRepository

    constructor() {
        this.permissionsRepository = new PermissionsRepository()
    }

    public async getPermissions() {
        const getPermissions = await this.permissionsRepository.getPermissions();
        return getPermissions;
    }

    public async createPermissions(permissions: any): Promise<any> {
        const createPermissions = {
            permissionName: permissions.permissionName,
            moduleName: permissions.moduleName,
        }
        const savedPermissions = await this.permissionsRepository.createPermissions(createPermissions);
        return savedPermissions
    }

    public async updatePermissions(permissions: any, permissionId: any): Promise<any> {

        const updatePermissions = await this.permissionsRepository.updatePermissions(permissions, permissionId)
        return updatePermissions
    }

    public async deletePermissions(permissionId: any): Promise<any> {
        const deletePermissions = await this.permissionsRepository.deletePermissions(permissionId)
        return deletePermissions
    }
}
export default PermissionsService