// Import the necessary modules from the Appwrite SDK.
import { Client, Storage } from 'appwrite';
import { CdnService } from './services/cdnService';

// Create an Appwrite client for connecting to the server.
const appwriteClient = new Client();
// const appwriteAccount = new Account(appwriteClient);

// Assign the server's API endpoint and the project ID.
const awEndpoint = process.env.REACT_APP_AWENDPOINT ?? ''
const awProject = process.env.REACT_APP_AWPROJECT ?? ''
const awBucket = process.env.REACT_APP_AWBUCKET ?? ''

const storage = new Storage(appwriteClient);

appwriteClient
    .setEndpoint(awEndpoint)
    .setProject(awProject);

export const createFile = (file: File) => storage.createFile(awBucket, CdnService.clearFileName(file.name), file)
export const viewFile = (id: string) => storage.getFileView(awBucket, id)
export const deleteFile = (id: string) => storage.deleteFile(awBucket, id)
