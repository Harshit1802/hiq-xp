import RolesRepository from "../repositories/roles.repository";

class RolesService {
    private rolesRepository: RolesRepository

    constructor() {
        this.rolesRepository = new RolesRepository()
    }

    public async getRoles() {
        const getRoles = await this.rolesRepository.getRoles();
        return getRoles;
    }

    public async createRoles(roles: any): Promise<any> {
        const createRoles = {
            roleName: roles.roleName,
            permissions: roles.permissions
        }
        const savedRoles = await this.rolesRepository.createRoles(createRoles);
        return savedRoles
    }

    public async updateRoles(roles: any, roleId: any): Promise<any> {

        const updateRoles = await this.rolesRepository.updateRoles(roles, roleId)
        return updateRoles
    }

    public async deleteRoles(roleId: any): Promise<any> {
        const deleteRoles = await this.rolesRepository.deleteRoles(roleId)
        return deleteRoles
    }
}
export default RolesService