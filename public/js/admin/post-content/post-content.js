const createPostContent = () => {
    const titleElement = document.getElementById('post-title');

    if (titleElement && titleElement.value) {
        const title = titleElement.value;
        const content = editor.getData();

        fetch('http://localhost:3000/admin/post-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                title: title,
                content: content
            }),
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    } else {
        console.log("Title is required");
    }
}

document.getElementById('create-post-content').addEventListener('click', createPostContent);
