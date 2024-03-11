import React from 'react'

const PreviewEditor = ({ htmlContent, cssContent, onHtmlChange, onCssChange }) => {
    return (
        <div>
            <h2>Edit Preview</h2>
            <div>
                <h3>HTML</h3>
                <textarea
                    rows={10}
                    cols={50}
                    value={htmlContent}
                    onChange={(e) => onHtmlChange(e.target.value)}
                />
            </div>
            <div>
                <h3>CSS</h3>
                <textarea
                    rows={10}
                    cols={50}
                    value={cssContent}
                    onChange={(e) => onCssChange(e.target.value)}
                />
            </div>
        </div>
    );
}

export default PreviewEditor