import { toggleModal } from '../common/common.js';

let categoryId
const deletePostCategoryModal = (e) => {
  const postDeleteElement = e.target;
  if (postDeleteElement) {
    categoryId = postDeleteElement.dataset.id;
  }
  else {
    console.error('Không tìm thấy post ID');
  }


  toggleModal('modal-delete-post-category', 'open');
};


//delete post category
const deletePostCategory = async () => {
    const loadingElement = document.getElementById('loading');
    if (!loadingElement) {
        return;
    }

    
    try {
    loadingElement.classList.remove('hidden');
    const response = await fetch(`/admin/post-content/category/${categoryId}`, {
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

const buttonDeleteElements = document.querySelectorAll('.delete-post-category');

const closeModalElement = document.getElementById(
  'cancel-modal-delete-post-category',
);
const buttonSubmitDeleteElement = document.getElementById(
    'submit-delete-post-category',
  );

if (buttonDeleteElements.length > 0) {
  buttonDeleteElements.forEach(button => {
    button.addEventListener('click', deletePostCategoryModal);
  });
}

if (buttonSubmitDeleteElement) {
    buttonSubmitDeleteElement.addEventListener('click', deletePostCategory);
  }

if (closeModalElement) {
  closeModalElement.addEventListener('click', () => {
    toggleModal('modal-delete-post-category', 'close');
  });
}
