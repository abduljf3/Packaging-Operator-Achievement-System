import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone-file-reader';

const ExcelComponent = () => {
    const [imported, setImported] = useState(false);
    const [url, setUrl] = useState('');

    const handleImport = (files) => {
        const formData = new FormData();
        formData.append('file', files[0]);

        axios.post('/import', formData)
            .then(() => setImported(true))
            .catch((error) => console.log(error));
    };

    const handleExport = () => {
        axios.get('/export')
            .then((response) => setUrl(response.data.url))
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Dropzone
                onDrop={handleImport}
                accept=".xlsx, .xls"
                multiple={false}
            >
                <button>Import</button>
            </Dropzone>

            <button onClick={handleExport}>Export</button>

            {imported && <p>Import successful</p>}
            {url && (
                <a href={url} download>
                    Download
                </a>
            )}
        </div>
    );
};