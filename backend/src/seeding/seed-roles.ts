import { RoleModel } from "../models/role.model";

export const seedRoles = async () => {

    const roles = [
        {
            role: "admin",
            permissions: [
                {name: "create:users", description: "Permission to create users"},
                {name: "delete:users", description: "Permission to delete users"},
            ]
        },
        {
            role: "manager",
            permissions: [
                {name: "read:employees", description: "Permission to read employees data"},
                {name: "update:employees", description: "Permission to update employees data"},
            ]
        },
        {
            role: "employee",
            permissions: [
                {name: "read:profile", description: "Permission to read own profile"},
                {name: "update:profile", description: "Permission to update own profile"},
            ]
        }
    ]

    try {
        for(const role of roles){
            const existingRole = await RoleModel.findOne({role: role.role});
            if(!existingRole){
                await RoleModel.create(role)
            }
        }
    } catch (error) {
        console.error("Error seeding roles:", error)
        process.exit()        
    }

}