const createPostCategory = () => {
    const nameElement = document.getElementById('name-post-category');
    
    const descriptionElement = document.getElementById('description-post-category');
    if (!nameElement && !nameElement.value) {
       console.log("error")
    }
    else {
        const name = nameElement.value;
        const description = descriptionElement.value;

        fetch('http://localhost:3000/admin/post-content/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: name,
                description: description
            }),
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    }
}

document.getElementById('button-new-post-category').addEventListener('click', createPostCategory);

