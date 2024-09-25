import mongoose from "mongoose";
import {Constants} from '../constants'
import { seedRoles } from "../seeding/seed-roles"
const DB_URI = Constants.DB_URI;
const DB_NAME = Constants.DB_NAME;

class DatabaseConnection {
    _URI:string;
    _DB_NAME:string
    
    constructor(uri: string, name: string){
        this._URI = uri;
        this._DB_NAME = name;
    }

    async connect () {
        try {
            const connectionInstance = await mongoose.connect(`${this._URI}/${this._DB_NAME}`);
            // seed-roles into db
            await seedRoles();
            console.log(' MongoDB connection successfull !! DB-HOST:', connectionInstance.connection.host);
        } catch (error) {
            console.log(' MongoDB connection failed !! Error ',error);
            process.exit(1)
        }
    }
}

export default new DatabaseConnection(DB_URI!, DB_NAME)