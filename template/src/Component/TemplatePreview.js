import React from 'react';
import './stylesheet.css';

const TemplatePreview = ({ htmlContent, cssContent, updateTitle }) => {


    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        updateTitle(newTitle);
    };

    return (
        <div className="container">
            <h2>Template Preview</h2>
            <input type="text" placeholder="Enter new title" onChange={handleTitleChange} />
            <style>{cssContent}</style>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

export default TemplatePreview;