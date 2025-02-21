document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        content.classList.toggle('shift');
    });
});
