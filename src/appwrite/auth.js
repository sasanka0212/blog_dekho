import conf from '../conf/conf.js';
import {Client, Account, ID} from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({name, email, password}) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name)
            if(user) {
                // login the user directly
                return this.login(email, password)
            } else {    
                return user;
            }
        } catch(error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return this.account.createEmailPasswordSession(email, password)
        } catch(error) {
            console.log(`Login error :: ${error}`);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch(error) {
            console.log(`Logout error :: ${error}`)
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch(error) {
            console.log(`get user error :: ${error}`)
        }
        return null;
    }
}

const authService = new AuthService()

export default authService