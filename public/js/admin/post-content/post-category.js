//create category post content
const createPostCategory = async () => {
  const nameElement = document.getElementById('name-post-category');
  const messageElement = document.getElementById('post-category-message');
  const descriptionElement = document.getElementById('description-post-category');
  const selectCategoryElement = document.getElementById('post-category');
  const nameElementError = document.getElementById('name-post-category-error');
  const loadingElementError = document.getElementById('loading');

  if (!nameElement || !descriptionElement || !selectCategoryElement || !nameElementError || !loadingElementError) {
    return;
  }

  const name = nameElement.value.trim();
  const description = descriptionElement.value.trim();
  let hasError = false;

  if (!name) {
    nameElementError.innerHTML = 'Vui lòng nhập tên cho thể loại.';
    hasError = true;
  }
  else {
    nameElementError.innerHTML = '';
  }

  if (hasError) {
    return;
  }

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
      if (messageElement) {       
        messageElement.classList.add('text-green-500');
        messageElement.innerHTML = data.message;
      }
      const newOption = document.createElement('option');
      newOption.value = data.data.id;
      newOption.text = data.data.name;
      if (selectCategoryElement) {
        selectCategoryElement.appendChild(newOption);
      }
      if (nameElement) nameElement.value = '';
      if (descriptionElement) descriptionElement.value = '';
    } else {
      if (messageElement) {
        messageElement.classList.add('text-red-500');
        messageElement.innerHTML = data.message;
      }
    }
  } catch (error) {
    console.error('Error:', error);
    if (messageElement) {
      messageElement.classList.add('text-red-500');
      messageElement.innerHTML =
        'Đã xảy ra lỗi khi tạo danh mục. Vui lòng thử lại.';
    }
  } finally {
    loadingElementError.classList.add('hidden');
  }
};

  const buttonCreatePostCategory = document.getElementById('button-new-post-category');

  if (buttonCreatePostCategory) {
    buttonCreatePostCategory.addEventListener('click', createPostCategory);
  }  
