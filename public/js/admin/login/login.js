document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('div.mt-8.space-y-6');
    const userNameInput = document.getElementById('admin_user_name');
    const passwordInput = document.getElementById('admin_password');
    const rememberCheckbox = document.getElementById('remember');
    const loginButton = loginForm ? loginForm.querySelector('button[type="submit"]') : null;
    if (loginForm && userNameInput && passwordInput && rememberCheckbox && loginButton) {
        async function login() {
            try {
                if (!userNameInput.value.trim()) {
                    alert('Vui lòng nhập tên đăng nhập');
                    return;
                }
                if (!passwordInput.value) {
                    alert('Vui lòng nhập mật khẩu');
                    return;
                }
                const loginData = {
                    username: userNameInput.value.trim(),
                    password: passwordInput.value,
                    remember: rememberCheckbox.checked
                };
                const response = await fetch('/admin/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Đăng nhập thất bại');
                }

                const data = await response.json();

                window.location.href = '/admin/post-content';
            } catch (error) {
                console.error('Lỗi:', error);
                alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
            }
        }

        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            login();
        });
    } else {
        console.error('Một hoặc nhiều phần tử không tồn tại');
    }
});
