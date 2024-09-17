import { toggleModal } from '../common/common.js';

// update post content
const updatePostContent = async () => {
  const titleElement = document.getElementById('post-title');
  const categoryElement = document.getElementById('post-category');
  const titleElementError = document.getElementById('post-title-error');
  const categoryElementError = document.getElementById('post-category-error');
  const imageElementError = document.getElementById('post-image-error');
  const loadingElement = document.getElementById('loading');
  const ckeditorElementError = document.getElementById('ckeditor-error');
  const editorElement = document.getElementById('editor');
  const updatePostContenElement = document.getElementById(
    'update-post-content',
  );
  const subtitlePostContentElement = document.getElementById(
    'subtitle-post-content',
  );
  const hashElement =
    titleElement &&
    categoryElement &&
    titleElementError &&
    categoryElementError &&
    imageElementError &&
    loadingElement &&
    ckeditorElementError &&
    editorElement &&
    updatePostContenElement &&
    subtitlePostContentElement;
  if (hashElement) {
    const formData = new FormData();

    if (image) {
      formData.append('upload', image);
    }

    const new_image = editorElement.dataset.new_image
      ? JSON.parse(editorElement.dataset.new_image)
      : [];
    const delete_image = editorElement.dataset.image_deletes
      ? JSON.parse(editorElement.dataset.image_deletes)
      : [];

    const post_id = updatePostContenElement.dataset.post_id;
    const title = titleElement.value;
    const content = editor.getData();
    const category_id = categoryElement.value;
    const subtitle = subtitlePostContentElement.value;

    let hasError = false;

    if (!title) {
      titleElementError.innerHTML = 'Vui lòng nhập tiêu đề cho bài viết.';
      hasError = true;
    } else {
      titleElementError.innerHTML = '';
    }

    if (!category_id) {
      categoryElementError.innerHTML = 'Vui lòng chọn thể loại cho bài viết.';
      hasError = true;
    } else {
      categoryElementError.innerHTML = '';
    }

    if (!content) {
      ckeditorElementError.innerHTML = 'Vui lòng nhập nội dung cho bài viết.';
      hasError = true;
    } else {
      ckeditorElementError.innerHTML = '';
    }

    if (hasError) {
      return;
    }

    try {
      loadingElement.classList.remove('hidden');
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category_id', category_id);
      formData.append('new_image', JSON.stringify(new_image));
      formData.append('delete_image', JSON.stringify(delete_image));
      formData.append('subtitle', subtitle);
      const response = await fetch(`/admin/post-content/${post_id}`, {
        method: 'PATCH',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: formData,
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        window.location.href = '/admin/post-content';
      } else {
        console.error('Server Error:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      loadingElement.classList.add('hidden');
    }
  } else {
    console.error('One or more required elements are missing');
  }
};

let image;
const uploadImages = (event) => {
  const fileInput = event.target;
  const previewImage = document.getElementById('thumbnail-preview');
  if (previewImage) {
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
  } else {
    console.error('Preview image element not found');
    return;
  }
};

const thumbnailPostContentElement = document.getElementById(
  'thumbnail-post-content',
);
const buttonUpdatePostContentElement = document.getElementById(
  'button-update-post-content',
);

if (thumbnailPostContentElement) {
  thumbnailPostContentElement.addEventListener('change', uploadImages);
}

if (buttonUpdatePostContentElement) {
  buttonUpdatePostContentElement.addEventListener('click', updatePostContent);
}

const openModalElement = document.getElementById(
  'open-modal-new-post-category',
);
const closeModalElement = document.getElementById(
  'close-modal-new-post-category',
);

if (openModalElement) {
  openModalElement.addEventListener('click', () => {
    toggleModal('modal-new-post-category', 'open');
  });
}

if (closeModalElement) {
  closeModalElement.addEventListener('click', () => {
    toggleModal('modal-new-post-category', 'close');
  });
}
