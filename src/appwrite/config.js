import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    // Notes Service

    async createNote({ title, description, coverImageId, pdfId, pricing, price, userId, keywords, userName }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
                ID.unique(),
                {
                    title,
                    description,
                    coverImageId,
                    pdfId,
                    pricing,
                    price,
                    userId,
                    keywords,
                    userName
                }

            )
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updateNote(slug, { title, description, coverImageId, pdfId, pricing, price, keywords, userName }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
                slug,
                {
                    title,
                    description,
                    coverImageId,
                    pdfId,
                    pricing,
                    price,
                    keywords,
                    userName
                }
            )
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deleteNote(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
                slug
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getNote(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
                slug
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getAllNotes() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
            );
        }
        catch (error) {
            console.log(error);
        }
    }

    // async searchNotes({title, keywords}){
    //     let queries = Query.or([Query.search("title", title), Query.search("keywords", keywords)])
    //     try{
    //         return this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteNotesCollectionId,
    //             queries
    //         )
    //     }
    //     catch(error){
    //         console.log("Appwrite service :: getPosts :: error", error);
    //         return false;
    //     }
    // }

    async searchNotes({ title, keywords }) {
        try {
            const queryList = [];

            if (title?.trim()) {
                queryList.push(Query.search("title", title.trim()));
            }

            if (keywords?.trim()) {
                queryList.push(Query.search("keywords", keywords.trim()));
            }

            // Prevent empty query array
            if (queryList.length === 0) {
                return { documents: [] };
            }

            const queries = queryList.length > 1 ? [Query.or(queryList)] : queryList;

            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: searchNotes :: error", error);
            return false;
        }

    }

    async getNotesByUser(userId) {
        try {
            const query = [Query.equal("userId", userId)]
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
                query
            )
        }
        catch (error) {
            console.log(error)
            return null;
        }
    }

    // async getNotesByIds(noteIds){
    //     try{

    //     }
    //     catch(error){
    //         console.log(error)
    //         return null;
    //     }
    // }

    // Downloads service

    async createDownloadInfo({ noteId, noteUserId, purchaseUserId }) {
        try {
            // let isDownloaded = await hasUserDownloadedNote({userId, noteId});
            // if (isDownloaded) return;
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDownloadsCollectionId,
                ID.unique(),
                {
                    noteId,
                    noteUserId,
                    purchaseUserId
                }

            )
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async getTotalDownloadsCount(noteId) {
        try {
            const query = [Query.equal("noteId", noteId)]
            let res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDownloadsCollectionId,
                query
            )
            return res.documents.length;
        }
        catch (error) {
            console.log(error)
            return 0;
        }

    }

    async hasUserDownloadedNote({ noteId, purchaseUserId }) {
        try {
            const queries = [Query.equal("purchaseUserId", purchaseUserId), Query.equal("noteId", noteId)]
            let res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDownloadsCollectionId,
                queries
            )
            return res.documents.length > 0;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }

    async getUserDownloadedNotes(purchaseUserId) {
        try {
            const query1 = [Query.equal("purchaseUserId", purchaseUserId)]
            const res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDownloadsCollectionId,
                query1
            )
            let noteIds = Array.from(res.documents).map((infoObj) => {
                return infoObj.noteId;
            })
            const query2 = [Query.equal("$id", noteIds)]
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteNotesCollectionId,
                query2
            )

        }
        catch (error) {
            console.log(error)
            return null;
        }
    }

    async getDownloadsByDateRange({noteUserId, start, end}) {
        let queries  = [
                Query.equal("noteUserId", noteUserId),
                Query.greaterThan('$createdAt', start),
                Query.lessThan('$createdAt', end)
            ]

        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDownloadsCollectionId,
                queries
                );
            return response.total;
        } catch (error) {
            console.error('Failed to fetch today\'s downloads:', error);
            return 0;
        }
    }

    // Reviews service

    async createReview({ noteId, userId, userName, rating, comment }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteReviewsCollectionId,
                ID.unique(),
                {
                    noteId,
                    userId,
                    userName,
                    rating,
                    comment
                }

            )
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updateReview(reviewId, { noteId, userId, userName, rating, comment }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteReviewsCollectionId,
                reviewId,
                {
                    noteId,
                    userId,
                    userName,
                    rating,
                    comment
                }
            )
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deleteReview(reviewId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteReviewsCollectionId,
                reviewId
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getAverageRating(noteId) {
        try {
            const query = [Query.equal("noteId", noteId)]
            let res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteReviewsCollectionId,
                query
            )
            let rating = 0;
            Array.from(res.documents).forEach((obj) => rating += obj.rating)
            return rating / res.documents.length;

        }
        catch (error) {
            console.log(error)
            return 0;
        }
    }


    async getReviews(noteId) {
        try {
            const query = [Query.equal("noteId", noteId)]
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteReviewsCollectionId,
                query
            )
        }
        catch (error) {
            console.log(error)
            return null;
        }
    }

    async getTotalReviews(noteId) {
        try {
            const query = [Query.equal("noteId", noteId)]
            let result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteReviewsCollectionId,
                query
            )
            return result.documents.length;
        }
        catch (error) {
            console.log(error)
            return 0;
        }
    }

    // Transaction Service

    async createTransactionInfo(transactionId, { noteId, noteUserId, purchaseUserId, amount }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTransactionsCollectionId,
                transactionId,
                {
                    noteId,
                    noteUserId,
                    purchaseUserId,
                    amount
                }
            )
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async getTransactionInfo({ noteId, purchaseUserId }) {
        try {
            const queries = [Query.equal("purchaseUserId", purchaseUserId), Query.equal("noteId", noteId)]
            let res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTransactionsCollectionId,
                queries
            )
            return Array.from(res.documents)[0];
        }
        catch (error) {
            console.log(error)
            return null;
        }
    }

    async getPaymentTransactionInfo(noteUserId) {
        try {
            const query = [Query.equal("noteUserId", noteUserId)]
            let res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTransactionsCollectionId,
                query
            )
            return res.documents;
        }
        catch (error) {
            console.log(error)
            return null;
        }
    }

    async getTotalTransactionsCount(noteId) {
        try {
            const query = [Query.equal("noteId", noteId)]
            let res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTransactionsCollectionId,
                query
            );
            console.log(res.documents)
            console.log(res.documents.length);
            return res.documents.length;
        }
        catch (error) {
            console.log(error)
            return 0;
        }
    }

    async getEarningsByDateRange({noteUserId, start, end}){
        let queries  = [
                Query.equal("noteUserId", noteUserId),
                Query.greaterThan('$createdAt', start),
                Query.lessThan('$createdAt', end)
            ]

        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTransactionsCollectionId,
                queries
                );
            let totalEarnings = 0;
            response.documents.forEach((val)=>{
                totalEarnings += val.amount;
            })
            return totalEarnings;
        } catch (error) {
            console.error('Failed to fetch today\'s downloads:', error);
            return 0;
        }
    }




    // File service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        );
    }

    downloadFile(fileId) {
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            fileId
        );
    }



}

const service = new Service();
export default service;
