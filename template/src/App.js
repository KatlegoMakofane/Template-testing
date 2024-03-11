// App.js
import React, { useState } from 'react';
import FileUpload from './Component/FileUpload';
import TemplatePreview from './Component/TemplatePreview';
import PreviewEditor from './Component/PreviewEditor';
import DownloadTemplate from './Component/DownloadTemplate';
import JSZip from 'jszip';


const App = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');

  const updateTitle = (newTitle) => {
    // Assuming 'newTitle' is the updated title text
    // You may need to modify this function based on your specific HTML structure
    setHtmlContent((prevHtmlContent) => {
      // Replace the existing title with the updated title
      const updatedHtmlContent = prevHtmlContent.replace(/<h1>.*?<\/h1>/, `<h1>${newTitle}</h1>`);
      return updatedHtmlContent;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target.result;
      const zip = new JSZip();

      try {
        const unzipped = await zip.loadAsync(content);
        const htmlFile = unzipped.file('MyTemplateTest/index.html');
        const cssFile = unzipped.file('MyTemplateTest/style.css');

        if (htmlFile && cssFile) {
          const htmlContent = await htmlFile.async('string');
          const cssContent = await cssFile.async('string');

          setHtmlContent(htmlContent);
          setCssContent(cssContent);
          console.log("html:", htmlContent);
          console.log("css:", cssContent);
        } else {
          console.error('HTML or CSS file not found in the zip archive');
        }
      } catch (error) {
        console.error('Error reading zip file:', error);
      }
    };

    reader.readAsBinaryString(file);
  };



  return (
    <div>
      <FileUpload onFileChange={handleFileChange} />
      -----------------------------------------------------------------------------------------------------------------------
      <PreviewEditor
        htmlContent={htmlContent}
        cssContent={cssContent}
        onHtmlChange={setHtmlContent}
        onCssChange={setCssContent}
      />
      ------------------------------------------------------------------------------------------------------------------------
      <TemplatePreview htmlContent={htmlContent} cssContent={cssContent} updateTitle={updateTitle} />
      ------------------------------------------------------------------------------------------------------------------------
      <DownloadTemplate htmlContent={htmlContent} cssContent={cssContent} />
    </div>
  );
};

export default App;

