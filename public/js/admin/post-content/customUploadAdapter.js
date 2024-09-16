class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload = () => {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('upload', file);

          fetch('/admin/post-content/upload/post-image', {
            method: 'POST',
            body: formData,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const editorElement = document.getElementById('editor');

              if (editorElement) {
                let currentData = editorElement.dataset.new_image
                  ? JSON.parse(editorElement.dataset.new_image)
                  : [];
                currentData.push(data.url);
                editorElement.dataset.new_image = JSON.stringify(currentData);
              }
              resolve({
                default: data.url,
              });
            })
            .catch((error) => {
              reject(error);
            });
        }),
    );
  };
}

export function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };

  editor.model.document.on('change', () => {
    const editorElement = document.getElementById('editor');
    const currentImageElement = document.getElementById('current-image');
    if (editorElement && currentImageElement) {
      editor.model.document.differ.getChanges().forEach(async (change) => {
        if (change.type === 'remove' && change.name === 'imageBlock') {
          const attributes = change.attributes;
          if (attributes) {
            const image_url = attributes.get('src');

            let newUrlImage = editorElement.dataset.new_image
              ? JSON.parse(editorElement.dataset.new_image)
              : [];
            if (newUrlImage.includes(image_url)) {
              newUrlImage = newUrlImage.filter((url) => url !== image_url);
              editorElement.dataset.new_image = JSON.stringify(newUrlImage);
            }

            let deleteUrlImage = editorElement.dataset.image_deletes
              ? JSON.parse(editorElement.dataset.image_deletes)
              : [];
            if (!deleteUrlImage.includes(image_url)) {
              deleteUrlImage.push(image_url);
            }
            editorElement.dataset.image_deletes =
              JSON.stringify(deleteUrlImage);
          }
        }

        if (change.type === 'insert' && change.name === 'imageBlock') {
          const attributes = change.attributes;
          if (attributes && attributes.get('src')) {
            const image_url = attributes.get('src');

            let currentUrlImage = currentImageElement.dataset.current_image
              ? JSON.parse(currentImageElement.dataset.current_image)
              : [];

            let deleteUrlImage = editorElement.dataset.image_deletes
              ? JSON.parse(editorElement.dataset.image_deletes)
              : [];
            deleteUrlImage = deleteUrlImage.filter((url) => url !== image_url);
            editorElement.dataset.image_deletes =
              JSON.stringify(deleteUrlImage);

            if (!currentUrlImage.includes(image_url)) {
              let newUrlImage = editorElement.dataset.new_image
                ? JSON.parse(editorElement.dataset.new_image)
                : [];
              if (!newUrlImage.includes(image_url)) {
                newUrlImage.push(image_url);
                editorElement.dataset.new_image = JSON.stringify(newUrlImage);
              }
            }
          }
        }
      });
    } else {
      console.error('editorElement hoặc Current image element not found');
    }
  });
}
