import { toggleModal } from '../common/common.js';

let postId
const editPostCategoryModal = (e) => {
    const postEditElement = e.target
    console.log(postEditElement);
    
    const currentCategoryElement = document.getElementById('current-category');
    const nameCategoryElement = document.getElementById('name-post-category-update');
    const descriptionCategoryElement = document.getElementById('description-post-category-update');
    
    if (postEditElement && currentCategoryElement && nameCategoryElement && descriptionCategoryElement) {
      postId = postEditElement.dataset.id;
      const currentCategories = currentCategoryElement.dataset.current_category
        ? JSON.parse(currentCategoryElement.dataset.current_category)
        : [];
      console.log(currentCategories);
      console.log(postId);
      
      const currentCategory = currentCategories.find(category => category.id == postId);
      console.log(currentCategory);
  
      if (currentCategory) {
        nameCategoryElement.value = currentCategory.name || '';
        descriptionCategoryElement.value = currentCategory.description || '';
      } else {
        console.warn('Không tìm thấy category tương ứng cho post này');
        nameCategoryElement.value = '';
        descriptionCategoryElement.value = '';
      }
    } else {
      console.error('Không tìm thấy các phần tử cần thiết');
    }
  
    toggleModal('modal-edit-post-category', 'open');
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

const buttonEditElements = document.querySelectorAll('.open-modal-edit');
const closeEditElement = document.getElementById('close-modal-edit-post-category');

const buttonSubmitDeleteElement = document.getElementById(
    'submit-delete-post-content',
  );

  if (buttonEditElements.length > 0) {
    buttonEditElements.forEach(button => {
      button.addEventListener('click', editPostCategoryModal);
    });
  }
if (buttonSubmitDeleteElement) {
    buttonSubmitDeleteElement.addEventListener('click', deletePostContent);
  }

if (closeEditElement) {
  closeEditElement.addEventListener('click', () => {
    toggleModal('modal-edit-post-category', 'close');
  });
}
