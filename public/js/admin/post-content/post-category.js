const createPostCategory = async () => {
    const nameElement = document.getElementById('name-post-category');
    const messageElement = document.getElementById('post-categort-message');
    const descriptionElement = document.getElementById(
      'description-post-category',
    );
    const selectCategoryElement = document.getElementById('post-category');
    const nameElementError = document.getElementById('name-post-category-error');
    const loadingElementError = document.getElementById('loading');
    const name = nameElement.value;
    const description = descriptionElement.value;
  
    const hasError = false;
    if (name) {
      nameElementError.innerHTML = '';
    }
  
    if (!nameElement || !name) {
      if (nameElementError) {
        nameElementError.innerHTML = 'Vui lòng nhập tên cho thể loại.';
      }
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
  
    try {
      loadingElementError.classList.remove('hidden');
      const response = await fetch(
        'http://localhost:3000/admin/post-content/category',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            description: description,
          }),
        },
      );
  
      const data = await response.json();
  
      if (response.ok && data.status === 200) {
        if (messageElement) {
          messageElement.classList.add('text-green-500');
          messageElement.innerHTML = data.msg;
        }
        const newOption = document.createElement('option');
        newOption.value = data.category.id;
        newOption.text = data.category.name;
        if (selectCategoryElement) {
          selectCategoryElement.appendChild(newOption);
        }
        if (nameElement) nameElement.value = '';
        if (descriptionElement) descriptionElement.value = '';
      } else {
        if (messageElement) {
          messageElement.classList.add('text-red-500');
          messageElement.innerHTML = data.msg;
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

  document
  .getElementById('button-new-post-category')
  .addEventListener('click', createPostCategory);
