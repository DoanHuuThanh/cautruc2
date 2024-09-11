class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload = () => {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('upload', file);

            try {
                fetch('http://localhost:3000/admin/post-content/upload/post-image', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    const editorElement = document.getElementById('editor');
                    let currentData = editorElement.dataset.images ? JSON.parse(editorElement.dataset.images) : [];
                    currentData.push({
                        id: data.id,
                        url: data.url,
                    });
                    editorElement.dataset.images = JSON.stringify(currentData);
                    resolve({
                        default: data.url
                    });
                })
                .catch(error => {
                    console.error('Error from server:', error);
                    reject(error);
                });
            }
            catch(error) {
                console.error('Error in try-catch block:', error);
                reject(error);
            }
        }));
    }
}

export function CustomUploadAdapterPlugin(editor) {    
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
    };

    editor.model.document.on('change', () => {
        const editorElement = document.getElementById('editor');
        editor.model.document.differ.getChanges().forEach(change => {
            if (change.type === 'remove' && change.name === 'imageBlock') {
                const attributes = change.attributes;
                if (attributes) {
                    let currentData = editorElement.dataset.images ? JSON.parse(editorElement.dataset.images) : [];
                    currentData = currentData.filter(item => item.url !== attributes.get('src'));
                    editorElement.dataset.images = JSON.stringify(currentData);
                }
            }
        });
    });
    
}
