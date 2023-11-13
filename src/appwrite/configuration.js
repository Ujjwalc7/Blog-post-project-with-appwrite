// import configig from "../configig/configig.js";
// import { Client, ID, Databases, Storage, Query } from "appwrite";

// export class Services{
//     client = new Client()
//     databases;
//     bucket;

//     constructor(){
//         this.client.setEndpoint(configig.appwriteUrl)
//         .setProject(configig.appwriteProjectId);
//         this.databases = new Databases(this.client);
//         this.bucket = new Storage(this.client);
//     }

//     async createPost({title, slug, content, featuredImage, 
//     status, userId}){
//         try {
//             return await this.databases.createDocument(
//                 configig.appwriteDatabaseId,
//                 configig.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredImage,
//                     status,
//                     userId
//                 }
//             );
//         } catch (error) {
//             console.log("Appwrite service :: createPost :: error",
//             error);
//         }
//     }

//     async updatePost(slug,{title, content, featuredImage, 
//         status}){
//             try {
//                 return await this.databases.updateDocument(
//                     configig.appwriteDatabaseId,
//                     configig.appwriteCollectionId,
//                     slug,
//                     {
//                         title,
//                         content,
//                         featuredImage,
//                         status
//                     }
//                 );
//             } catch (error) {
//                 console.log("Appwrite service :: updatePost :: error",
//                 error);
//             }
//         }

//     async deletePost(slug){
//                 try {
//                     await this.databases.deleteDocument(
//                         configig.appwriteDatabaseId,
//                         configig.appwriteCollectionId,
//                         slug,
//                     );
//                     return true;
//                 } catch (error) {
//                     console.log("Appwrite service :: deletePost :: error",
//                     error);
//                     return false;
//                 }
//         }
    
//     async getPost(slug){
//         try {
//             return await this.databases.getDocument(
//                 configig.appwriteDatabaseId,
//                 configig.appwriteCollectionId,
//                 slug,
//                 );
//             } catch (error) {
//                 console.log("Appwrite service :: getPost :: error",
//                 error);
//                 return false;
//             }
//         }
//     async getPosts(queris = [
//         Query.equal('status', 'active')
//     ]){
//         try {
//             return await this.databases.listDocuments(
//                 configig.appwriteDatabaseId,
//                 configig.appwriteCollectionId,
//                 queris,
//                 );
//             } catch (error) {
//                 console.log("Appwrite service :: getPost :: error",
//                 error);
//                 return false;
//             }
//         }
        
//     async uploadFile(file){
//         try {
//             return await this.bucket.createFile(
//                 configig.appwriteBuckectId,
//                 ID.unique(),
//                 file
//                 );
//             } catch (error) {
//                 console.log("Appwrite service :: uploadFile :: error",
//                 error);
//                 return false;
//             }
//         }

//     async deleteFile(fileId){
//         try {
//             await this.bucket.deleteFile(
//                 configig.appwriteBuckectId,
//                 fileId
//                 );
//                 return true;
//             } catch (error) {
//                 console.log("Appwrite service :: deleteFile :: error",
//                 error);
//                 return false;
//             }
//         }           
    

//     getFilePreview(fileId){
//         return this.bucket.getFilePreview(
//             configig.appwriteBuckectId,
//             fileId
//         )
//     }

// }

// const service = new Services
// export default service






import config from '../config/config.js';
import { Client, ID, Databases, Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service