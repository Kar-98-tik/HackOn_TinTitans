document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    let isDark = false;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggle.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Sidebar Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    let isSidebarOpen = true;

    menuToggle.addEventListener('click', () => {
        isSidebarOpen = !isSidebarOpen;
        sidebar.style.width = isSidebarOpen ? '250px' : '70px';
    });

    // Save Button Functionality
    const saveBtn = document.querySelector('.save-btn');
    const toast = document.getElementById('toast');

    saveBtn.addEventListener('click', () => {
        // Simulate saving
        toast.textContent = 'Changes saved successfully!';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });

    // Avatar Upload Preview
    const avatarContainer = document.querySelector('.avatar-container');
    const avatarPreview = document.getElementById('avatarPreview');

    avatarContainer.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    });
});