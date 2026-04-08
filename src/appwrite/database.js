import conf from '../conf/conf.js'
import { Client, Databases, Storage, ID, Query } from 'appwrite'

export class DatabaseService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createBlog({slug, title, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch(error) {
            console.log(`Appwrite - Create Blog error: ${error}`)
        }
    }

    async updateBlog(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title, 
                    content,
                    featuredImage, 
                    status
                }
            )
        } catch(error) {
            console.log(`Appwrite - Update Blog error: ${error}`)
        }
    }

    async deleteBlog(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
            return true
        } catch(error) {
            console.log(`Appwrite - Delete Blog error: ${error}`)
        }
        return false
    }

    async getBlog(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
        } catch(error) {
            console.log(`Appwrite - Get blog error: ${error}`)
        }
        return false
    }

    async listBlogs(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries
            )
        } catch(error) {
            console.log(`Appwrite - List blogs error: ${error}`)
        }
        return false
    }

    async uploadFile(file) {
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch(error) {
            console.log(`Appwrite - File upload error: ${error}`)
        }
        return false
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch(error) {
            console.log(`Appwrite - Delete file error: ${error}`)
        }
        return false
    }

    previewFile(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId,
        )
    }
}

const databaseService = new DatabaseService();

export default databaseService;