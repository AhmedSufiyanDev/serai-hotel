// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

function ViewerWrapper ({ filePath }) {    
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    const toolbarPluginInstance = toolbarPlugin({
        getFilePlugin: {
            fileNameGenerator: (file) => {
                const fileName = file.name.substring(file.name.lastIndexOf('/') + 1);
                return `${fileName}`;
            }
        }
    });
    const { Toolbar } = toolbarPluginInstance;   

    return (
        <div
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                height: '900px',
                marginBottom: 50
            }}
        >
            <div
                style={{
                    borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                    overflow: 'auto',
                    width: '30%',
                }}
            >
                <Thumbnails />
            </div>
            <div style={{ flex: 1 }}>
                <Toolbar />
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={filePath} plugins={[thumbnailPluginInstance, toolbarPluginInstance]} />
                </Worker>
            </div>
        </div>
    );
};

export default ViewerWrapper;