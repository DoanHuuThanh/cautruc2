const createPostContent = async () => {
    const titleElement = document.getElementById('post-title');
    const categoryElement = document.getElementById('post-category');
    const titleElementError = document.getElementById('post-title-error');
    const categoryElementError = document.getElementById('post-category-error');
    const imageElementError = document.getElementById('post-image-error');
    const loadingElementError = document.getElementById('loading');
    const ckeditorElementError = document.getElementById('ckeditor-error');
    const editorElement = document.getElementById('editor');
    const updatePostContenElement = document.getElementById('update-post-content')    
    const formData = new FormData();
  
    if (image) {
      formData.append('upload', image);
    }

    const new_image = editorElement.dataset.new_image
      ? JSON.parse(editorElement.dataset.new_image)
      : [];

    const delete_image = editorElement.dataset.delete_images
      ? JSON.parse(editorElement.dataset.delete_images)
      : [];

    const post_id = updatePostContenElement.dataset.post_id
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
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', category_id);
    formData.append('new_image', JSON.stringify(new_image));
    formData.append('delete_image', JSON.stringify(delete_image));
      const response = await fetch(`http://localhost:3000/admin/post-content/${post_id}`, {
        method: 'PATCH',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: formData,
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
  
  let image;
  const uploadImages = (event) => {
    const fileInput = event.target;
    const previewImage = document.getElementById('thumbnail-preview');
    const files = fileInput.files;
  
    if (files.length > 0) {
      const file = files[0];
      image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.classList.add('!w-[400px]', '!h-[250px]');
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  document
    .getElementById('thumbnail-post-content')
    .addEventListener('change', uploadImages);
  
  document
    .getElementById('button-update-post-content')
    .addEventListener('click', createPostContent);
