const createPostCategory = () => {
    const nameElement = document.getElementById('name-post-category');
    const messageElement = document.getElementById('post-categort-message');
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
            .then(data => {
                if (data.status === 200) {
                    messageElement.classList.add('text-green-500')
                    messageElement.innerHTML = data.msg
                    nameElement.value = ''
                    descriptionElement.value = ''
                }
                else {
                    messageElement.classList.add('text-red-500')
                    messageElement.innerHTML = data.msg
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

document.getElementById('button-new-post-category').addEventListener('click', createPostCategory);

