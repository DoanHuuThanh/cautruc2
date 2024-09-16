//update status post content
const updateStatusPostContent = async (e) => {
    console.log("123");
    const loadingElement = document.getElementById('loading');
    if (!loadingElement) {
        return;
    }

    const postDeleteElement = e.target;
    const postId = postDeleteElement.dataset.id;
    const status = postDeleteElement.checked;

    try {
        loadingElement.classList.remove('hidden');
        const response = await fetch(`/admin/post-content/status/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: status,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Update successful:', data);
        } else {
            console.error('Server Error:', data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loadingElement.classList.add('hidden');
    }
};

const changeStatusElement = document.querySelector('.toggle-checkbox');

if (changeStatusElement) {
    changeStatusElement.addEventListener('change', updateStatusPostContent);
}
