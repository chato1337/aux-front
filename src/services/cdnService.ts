import { createFile, deleteFile } from "../appwrite"

export class CdnService {

	static addFile = async (file: File) => {
		try {
			const res = await createFile(file)
			return res
		} catch (error) {
			console.log(error)
		}
	}

	static clearFileName = (name: string) => {
		return name.replace(/[^a-zA-Z0-9._-]/g, '').slice(0,35);
	}

	static removeFile = async(fileId: string) => {
		try {
			const res = await deleteFile(fileId)
			return res
		} catch (error) {
			console.log(error)
		}
	}

}
