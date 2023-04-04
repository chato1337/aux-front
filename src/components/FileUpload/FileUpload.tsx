
import { ChangeEvent } from 'react';

type FileUploadProps = {
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FileUpload = ({ handleChange }: FileUploadProps) => {

	return (
		<div className="file-upload form-control">
			<label htmlFor="filesUp">Files</label>
			<input type="file" onChange={handleChange} />
		</div>
	);
};

export default FileUpload;
