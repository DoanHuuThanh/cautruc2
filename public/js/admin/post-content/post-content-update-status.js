import { toggleModal } from '../common/common.js';

// update status post content
const updateStatusPostContent = async (e) => {
    const loadingElement = document.getElementById('loading');
    const statusElement = document.getElementById('status');

    if (loadingElement && statusElement) {
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
                toggleModal('modal-status', 'open');
                statusElement.classList.add('text-green-500');
                statusElement.innerHTML = data.message;
            } else {
                toggleModal('modal-status', 'open');
                statusElement.classList.add('text-text-500');
                statusElement.innerHTML = 'Cập nhập trạng thái thất bại';
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            loadingElement.classList.add('hidden');
        }
    } else {
        console.error('Loading or status element not found');
    }
};

const changeStatusElement = document.querySelector('.toggle-checkbox');
const exitModalStatus = document.getElementById('exit-modal-status');

if (changeStatusElement) {
    changeStatusElement.addEventListener('change', updateStatusPostContent);
} else {
    console.error('Change status element not found');
}

if (exitModalStatus) {
    exitModalStatus.addEventListener('click', () => {
        toggleModal('modal-status', 'close');
    });
} else {
    console.error('Exit modal status element not found');
}
