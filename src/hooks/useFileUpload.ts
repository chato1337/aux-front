
import { useState, ChangeEvent } from 'react';


export const useFileUpload = () => {
	const [file, setFile] = useState<File | null>(null)
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event && event.target.files && event.target.files.length > 0) {
			const eventFile = event.target.files[0]
			setFile(eventFile)
		}
	}

	return {
		handleChange,
		file
	}
}
