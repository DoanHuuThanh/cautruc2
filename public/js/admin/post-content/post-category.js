import { toggleModal } from '../common/common.js';

//create category post content
const createPostCategory = async () => {
  const nameElement = document.getElementById('name-post-category');
  const descriptionElement = document.getElementById('description-post-category');
  const selectCategoryElement = document.getElementById('post-category');
  const nameElementError = document.getElementById('name-post-category-error');
  const loadingElementError = document.getElementById('loading');
  const categoriesElement = document.getElementById('modal-new-post-category');
  const statusElement = document.getElementById('status');

  if (nameElement && descriptionElement && selectCategoryElement && nameElementError && 
      loadingElementError && categoriesElement && statusElement) {
    const categories = categoriesElement.dataset.categories
      ? JSON.parse(categoriesElement.dataset.categories)
      : [];

    const name = nameElement.value.trim();
    const description = descriptionElement.value.trim();
    let hasError = false;

    if (categories.some((category) => category.name === name)) {
      nameElementError.innerHTML = 'Tên thể loại đã tồn tại. Vui lòng chọn tên khác.';
      hasError = true;
    } else if (!name) {
      nameElementError.innerHTML = 'Vui lòng nhập tên cho thể loại.';
      hasError = true;
    } else {
      nameElementError.innerHTML = '';
    }

    if (!hasError) {
      try {
        loadingElementError.classList.remove('hidden');
        const response = await fetch('/admin/post-content/category', {
          method: 'POST',
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
          statusElement.classList.add('text-green-500');
          statusElement.innerHTML = data.message;
          toggleModal('modal-status', 'open');
          const newOption = document.createElement('option');
          newOption.value = data.data.id;
          newOption.text = data.data.name;
          selectCategoryElement.appendChild(newOption);
          nameElement.value = '';
          descriptionElement.value = '';
        } else {
          toggleModal('modal-status', 'open');
          statusElement.classList.add('text-red-500');
          statusElement.innerHTML = 'Đã xảy ra lỗi. Không tạo được thể loại.';
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

const buttonCreatePostCategory = document.getElementById('button-new-post-category');
const exitModalStatus = document.getElementById('exit-modal-status');

if (buttonCreatePostCategory) {
  buttonCreatePostCategory.addEventListener('click', createPostCategory);
} else {
  console.error('Button create post category not found');
}

if (exitModalStatus) {
  exitModalStatus.addEventListener('click', () => {
    toggleModal('modal-status', 'close');
  });
} else {
  console.error('Exit modal status button not found');
}
