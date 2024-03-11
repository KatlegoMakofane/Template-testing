import React from 'react'

const FileUpload = ({ onFileChange }) => {
    return (
        <div>
            <h2>Upload Template</h2>
            <input type="file" onChange={onFileChange} accept=".zip" />
        </div>
    );
}

export default FileUpload