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
  const [jsContent, setJsContent] = useState('');

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
        const htmlFiles = getHtmlFiles(unzipped.files);
        const cssFile = getCssFile(unzipped.files);
        const jsFile = getJSFile(unzipped.files);
  
        if (!htmlFiles.length || !cssFile || !jsFile) {
          throw new Error('HTML or CSS file not found in the zip archive');
        }
  
        // Assuming the first HTML file in the list is the main one to preview
        const htmlContent = await htmlFiles[0].async('string');
        const cssContent = await cssFile.async('string');
        const jsContent = await jsFile.async('string');
  
        setHtmlContent(htmlContent);
        setCssContent(cssContent);
        setHtmlFiles(htmlFiles); // Set all HTML files in the folder
        setJsContent(jsContent);
      } catch (error) {
        console.error('Error reading zip file:', error);
      }
    };
  
    reader.readAsBinaryString(file);
  };
  
  const getHtmlFiles = (files) => {
    const htmlFiles = Object.values(files).filter(file => file.name.endsWith('.html'));
    return htmlFiles;
  };
  
  const getCssFile = (files) => {
    return Object.values(files).find(file => file.name.endsWith('.css'));
  };

  const getJSFile = (files) => {
    return Object.values(files).find(file => file.name.endsWith('.js'));
  };
  
  const setHtmlFiles = (files) => {
    // Implement this function according to your requirements
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
        jsContent={jsContent}
      />
      ------------------------------------------------------------------------------------------------------------------------
      <TemplatePreview htmlContent={htmlContent} cssContent={cssContent} updateTitle={updateTitle}  jsContent={jsContent}/>
      ------------------------------------------------------------------------------------------------------------------------
      <DownloadTemplate htmlContent={htmlContent} cssContent={cssContent}  jsContent={jsContent}/>
    </div>
  );
};

export default App;

