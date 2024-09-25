import mongoose from "mongoose";
import { RoleModel } from "../models/role.model";
import { Constants } from "../constants";

export const seedRoles = async () => {
  const roles = [
    {
      role: "admin",
      permissions: [
        { name: "create:users", description: "Permission to create users" },
        { name: "delete:users", description: "Permission to delete users" },
      ],
    },
    {
      role: "manager",
      permissions: [
        {
          name: "read:employees",
          description: "Permission to read employees data",
        },
        {
          name: "update:employees",
          description: "Permission to update employees data",
        },
      ],
    },
    {
      role: "employee",
      permissions: [
        { name: "read:profile", description: "Permission to read own profile" },
        {
          name: "update:profile",
          description: "Permission to update own profile",
        },
      ],
    },
  ];

  try {
    for (const role of roles) {
      const existingRole = await RoleModel.findOne({ role: role.role });
      if (!existingRole) {
        await RoleModel.create(role);
        console.log(`Inserted role: ${role.role}`);
      } else {
        console.log(`Role ${role.role} already exists. Skipping...`);
      }
    }
    console.log("Role seeding completed.");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

const runSeed = async () => {
    try {
        const connection = await mongoose.connect(`${Constants.DB_URI}/${Constants.DB_NAME}`);
        console.log('Connected to MongoDB');

        // seed the roles
        await seedRoles();

        // close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed')
    } catch (error) {
        console.error('Error during database seeding: ', error);
        process.exit(1);
    }
}

runSeed()
