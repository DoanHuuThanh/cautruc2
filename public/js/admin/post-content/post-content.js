const createPostContent = () => {
    const titleElement = document.getElementById('post-title');
    const categoryElement = document.getElementById('post-category');
    const editorElement = document.getElementById('editor');
    const currentImage = editorElement.dataset.images ? JSON.parse(editorElement.dataset.images) : [];
    const imageIds = currentImage.map(img => img.id);

    if (!titleElement || !titleElement.value) {
        console.log("error");
    }
    else if(!categoryElement || !categoryElement.value) {
        console.log("error");
    }
    else {
        const title = titleElement.value;
        const content = editor.getData();
        const category_id = categoryElement.value

        fetch('http://localhost:3000/admin/post-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                title: title,
                content: content,
                category_id: category_id,
                imageIds: imageIds
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    window.location.href = '/admin/post-content';
                  }
            })
            .catch(error => console.error('Error:', error));
    }
}

document.getElementById('create-post-content').addEventListener('click', createPostContent);
