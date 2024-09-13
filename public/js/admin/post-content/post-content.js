const createPostContent = async () => {
  const titleElement = document.getElementById('post-title');
  const categoryElement = document.getElementById('post-category');
  const titleElementError = document.getElementById('post-title-error');
  const categoryElementError = document.getElementById('post-category-error');
  const imageElementError = document.getElementById('post-image-error');
  const loadingElementError = document.getElementById('loading');
  const ckeditorElementError = document.getElementById('ckeditor-error');
  const title = titleElement.value;
  const content = editor.getData();
  const category_id = categoryElement.value;
  if (titleElementError) {
    titleElementError.innerHTML = '';
  }
  if (categoryElementError) {
    categoryElementError.innerHTML = '';
  }
  if (imageElementError) {
    imageElementError.innerHTML = '';
  }

  if (content) {
    ckeditorElementError.innerHTML = '';
  }

  let hasError = false;

  if (!titleElement || !title) {
    if (titleElementError) {
      titleElementError.innerHTML = 'Vui lòng nhập tiêu đề cho bài viết.';
    }
    hasError = true;
  }

  if (!categoryElement || !category_id) {
    if (categoryElementError) {
      categoryElementError.innerHTML = 'Vui lòng chọn thể loại cho bài viết.';
    }
    hasError = true;
  }

  if (!image_id) {
    if (imageElementError) {
      imageElementError.innerHTML = 'Vui lòng chọn ảnh đại diện cho bài viết.';
    }
    hasError = true;
  }

  if (!content) {
    if (imageElementError) {
      ckeditorElementError.innerHTML = 'Vui lòng nhập nội dung  cho bài viết.';
    }
    hasError = true;
  }

  if (hasError) {
    return;
  }

  try {
    loadingElementError.classList.remove('hidden');
    const response = await fetch('http://localhost:3000/admin/post-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        category_id: category_id,
        image_id: image_id,
      }),
    });
    const data = await response.json();
    if (data.status === 200) {
      window.location.href = '/admin/post-content';
    } else {
      console.error('Server Error:', data.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loadingElementError.classList.add('hidden');
  }
};

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

let image_id;
const uploadImages = () => {
  const fileInput = document.getElementById('thumbnail-post-content');
  const files = fileInput.files;
  const previewImage = document.getElementById('thumbnail-preview');
  const uploadStatus = document.createElement('p');
  uploadStatus.textContent = 'Loading...';
  uploadStatus.classList.add(
    'text-sm',
    'text-gray-500',
    'dark:text-gray-400',
    'mt-2',
  );

  if (files.length > 0) {
    const file = files[0];
    const formData = new FormData();
    formData.append('upload', file);

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.classList.add('!w-[400px]', '!h-[250px]');
    };
    reader.readAsDataURL(file);

    const label = document.querySelector('label[for="thumbnail-post-content"]');
    label.appendChild(uploadStatus);
    fetch('http://localhost:3000/admin/post-content/upload/post-image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        image_id = data.id;
        uploadStatus.textContent = '';
      })
      .catch((error) => {
        console.error('Error from server:', error);
        uploadStatus.textContent = 'Error occurred during upload.';
        uploadStatus.classList.add('text-red-500');
      });
  }
};

document
  .getElementById('thumbnail-post-content')
  .addEventListener('change', uploadImages);

document
  .getElementById('thumbnail-post-content')
  .addEventListener('change', uploadImages);
document
  .getElementById('button-new-post-category')
  .addEventListener('click', createPostCategory);
document
  .getElementById('create-post-content')
  .addEventListener('click', createPostContent);
