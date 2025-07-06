const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteNotesCollectionId: String(import.meta.env.VITE_APPWRITE_NOTES_COLLECTION_ID),
    appwriteDownloadsCollectionId: String(import.meta.env.VITE_APPWRITE_DOWNLOADS_COLLECTION_ID),
    appwriteReviewsCollectionId: String(import.meta.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID),
    appwriteTransactionsCollectionId: String(import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID),
    appwritePaymentsCollectionId: String(import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    // razorpayKeyId: String(import.meta.env.VITE_RAZORPAY_KEY_ID),
    // razorpaySecretKey: String(import.meta.env.VITE_RAZORPAY_SECRET_KEY)
}

export default conf;