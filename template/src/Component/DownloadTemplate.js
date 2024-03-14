import React from 'react';
import JSZip from 'jszip';
// import { saveAs } from 'file-saver';

const DownloadTemplate = ({ htmlContent, cssContent ,jsContent}) => {
    const handleDownload = () => {
        const zip = new JSZip();
        zip.file('index.html', htmlContent);
        zip.file('style.css', cssContent);
        zip.file('App.js',jsContent);

        zip.generateAsync({ type: 'blob' }).then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'updated_template.zip';
            a.click();
        });
    };

    return (
        <div>
            <h2>Download Updated Template</h2>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default DownloadTemplate;
