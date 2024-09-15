import { toggleModal } from '../common/common.js';

let postId
const deletePostContentModal = (e) => {
    toggleModal('modal-delete-post-content', 'open');
    const postDeleteElement = e.target;
    postId = postDeleteElement.dataset.id;
    console.log('Post ID:', postId); 
};

const deletePostContent = async () => {
    const loadingElement = document.getElementById('loading');
    if (!loadingElement) {
        return;
    }
    try {
    loadingElement.classList.remove('hidden');
    const response = await fetch(`/admin/post-content/${postId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.status === 200) {
      window.location.reload()
    } else {
      console.error('Server Error:', data.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loadingElement.classList.add('hidden');
  }
} 

const buttonDeleteElement = document.getElementById('delete-post-content');
const closeModalElement = document.getElementById(
  'cancel-modal-delete-post-content',
);
const buttonSubmitDeleteElement = document.getElementById(
    'submit-delete-post-content',
  );

if (buttonDeleteElement) {
  buttonDeleteElement.addEventListener('click', deletePostContentModal);
}

if (buttonSubmitDeleteElement) {
    buttonSubmitDeleteElement.addEventListener('click', deletePostContent);
  }

if (closeModalElement) {
  closeModalElement.addEventListener('click', () => {
    toggleModal('modal-delete-post-content', 'close');
  });
}
