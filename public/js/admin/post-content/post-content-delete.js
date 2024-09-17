import { toggleModal } from '../common/common.js';

let postId
const deletePostContentModal = (e) => {
  const postDeleteElement = e.target.closest('button[data-id]');
  if (postDeleteElement) {
    postId = postDeleteElement.dataset.id;
    console.log(postId);
  }
  else {
    console.error('Không tìm thấy post ID');
  }


  toggleModal('modal-delete-post-content', 'open');
};


//delete post content
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
    if (data.statusCode === 200) {
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

const buttonDeleteElements = document.querySelectorAll('.delete-post-content');

const closeModalElement = document.getElementById(
  'cancel-modal-delete-post-content',
);
const buttonSubmitDeleteElement = document.getElementById(
    'submit-delete-post-content',
  );

if (buttonDeleteElements.length > 0) {
  buttonDeleteElements.forEach(button => {
    button.addEventListener('click', deletePostContentModal);
  });
}

if (buttonSubmitDeleteElement) {
    buttonSubmitDeleteElement.addEventListener('click', deletePostContent);
  }

if (closeModalElement) {
  closeModalElement.addEventListener('click', () => {
    toggleModal('modal-delete-post-content', 'close');
  });
}
