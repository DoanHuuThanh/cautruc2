import { toggleModal } from '../common/common.js';

let categoryId
const editPostCategoryModal = (e) => {
    const postEditElement = e.target
    const currentCategoryElement = document.getElementById('current-category');
    const nameCategoryElement = document.getElementById('name-post-category-update');
    const descriptionCategoryElement = document.getElementById('description-post-category-update');
    
    if (postEditElement && currentCategoryElement && nameCategoryElement && descriptionCategoryElement) {
      categoryId = postEditElement.dataset.id;
      const currentCategories = currentCategoryElement.dataset.current_category
        ? JSON.parse(currentCategoryElement.dataset.current_category)
        : [];

      const currentCategory = currentCategories.find(category => category.id == categoryId);

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

  //update post category
  const updatePostCategory = async () => {
    const nameElement = document.getElementById('name-post-category-update');
    const descriptionElement = document.getElementById('description-post-category-update');
    const nameElementError = document.getElementById('name-post-category-update-error');
    const loadingElementError = document.getElementById('loading');
    const categoriesElement = document.getElementById('current-category');
    const statusElement = document.getElementById('status');
  
    if (nameElement && descriptionElement && nameElementError && 
        loadingElementError && categoriesElement && statusElement) {
      const categories = categoriesElement.dataset.current_category
        ? JSON.parse(categoriesElement.dataset.current_category)
        : [];
  
      const name = nameElement.value.trim();
      const description = descriptionElement.value.trim();
      let hasError = false;
  
      if (!name) {
        nameElementError.innerHTML = 'Vui lòng nhập tên cho thể loại.';
        hasError = true;
      } else {
        nameElementError.innerHTML = '';
      }
  
      if (!hasError) {
        try {
          loadingElementError.classList.remove('hidden');
          const response = await fetch(`/admin/post-content/category/${categoryId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              description: description,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok && data.statusCode === 200) {
              window.location.reload()
          } else {
            toggleModal('modal-status', 'open');
            statusElement.classList.add('text-red-500');
            statusElement.innerHTML = data.message;
          }
        } catch (error) {
          console.error('Error:', error);
          toggleModal('modal-status', 'open');
          statusElement.classList.add('text-red-500');
          statusElement.innerHTML = 'Đã xảy ra lỗi khi tạo danh mục. Vui lòng thử lại.';
        } finally {
          loadingElementError.classList.add('hidden');
        }
      }
    } else {
      console.error('One or more required elements are missing');
    }
  };

const buttonEditElements = document.querySelectorAll('.open-modal-edit');
const closeEditElement = document.getElementById('close-modal-edit-post-category');
const closeStatusElement = document.getElementById('exit-modal-status')
const buttonSubmitUpdatePostCategory = document.getElementById('button-new-post-category-update');

  if (buttonEditElements.length > 0) {
    buttonEditElements.forEach(button => {
      button.addEventListener('click', editPostCategoryModal);
    });
  }

if (closeEditElement) {
  closeEditElement.addEventListener('click', () => {
    toggleModal('modal-edit-post-category', 'close');
  });
}

if (closeStatusElement) {
  closeStatusElement.addEventListener('click', () => {
    toggleModal('modal-status', 'close');
  });
}

if (buttonSubmitUpdatePostCategory) {
  buttonSubmitUpdatePostCategory.addEventListener('click', updatePostCategory);
}
