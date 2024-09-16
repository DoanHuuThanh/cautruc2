import { toggleModal } from '../common/common.js';


//create post content
const createPostContent = async () => {
  const titleElement = document.getElementById('post-title');
  const categoryElement = document.getElementById('post-category');
  const titleElementError = document.getElementById('post-title-error');
  const categoryElementError = document.getElementById('post-category-error');
  const imageElementError = document.getElementById('post-image-error');
  const loadingElement = document.getElementById('loading');
  const ckeditorElementError = document.getElementById('ckeditor-error');
  const editorElement = document.getElementById('editor');
  const newPostContenElement = document.getElementById('new-post-content');
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
    newPostContenElement &&
    subtitlePostContentElement;
  if (hashElement) {
    const new_image = editorElement.dataset.new_image
      ? JSON.parse(editorElement.dataset.new_image)
      : [];

    const delete_image = editorElement.dataset.image_deletes
      ? JSON.parse(editorElement.dataset.image_deletes)
      : [];

    const post_id = newPostContenElement.dataset.post_id;
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

    if (!image_url) {
      imageElementError.innerHTML = 'Vui lòng chọn hình ảnh đại diện.';
      hasError = true;
    } else {
      imageElementError.innerHTML = '';
    }

    if (hasError) {
      return;
    }

    try {
      loadingElement.classList.remove('hidden');

      const formData = new FormData();
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

let image_url;
const uploadImages = (event) => {
  const newPostContenElement = document.getElementById('new-post-content');
  if (newPostContenElement) {
    const post_id = newPostContenElement.dataset.post_id
      ? newPostContenElement.dataset.post_id
      : null;      
    const fileInput = event.target;
    const files = fileInput?.files;

    if (fileInput && files && files.length > 0) {
      const file = files[0];
      const previewImage = document.getElementById('thumbnail-preview');
      if (previewImage) {
        const uploadStatus = document.createElement('p');
        uploadStatus.textContent = 'Loading...';
        uploadStatus.classList.add(
          'text-sm',
          'text-gray-500',
          'dark:text-gray-400',
          'mt-2',
        );

        const formData = new FormData();
        formData.append('upload', file);
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          previewImage.classList.add('!w-[400px]', '!h-[250px]');
        };
        reader.readAsDataURL(file);
        const label = document.querySelector('label[for="thumbnail-post-content"]');
        if (label) {
          label.appendChild(uploadStatus);
          fetch(`/admin/post-content/${post_id}`, {
            method: 'PATCH',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              image_url = data.data.url;
              uploadStatus.textContent = '';
            })
            .catch((error) => {
              console.error('Error from server:', error);
              uploadStatus.textContent = 'Error occurred during upload.';
              uploadStatus.classList.add('text-red-500');
            });
        }
      }
    }
  }
};


const thumbnailPostContentElement = document.getElementById(
  'thumbnail-post-content',
);
const buttonCreatePostContentElement = document.getElementById(
  'create-post-content',
);

if (thumbnailPostContentElement) {
  thumbnailPostContentElement.addEventListener('change', uploadImages);
}

if (buttonCreatePostContentElement) {
  buttonCreatePostContentElement.addEventListener('click', createPostContent);
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
