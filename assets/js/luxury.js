document.addEventListener('DOMContentLoaded', () => {
    // 创建自定义光标
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    // 更新光标位置
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // 光标悬停效果
    const links = document.querySelectorAll('a, button, .luxury-portfolio-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = 'var(--gold)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'var(--white)';
        });
    });

    // 页面滚动动画
    const scrollIndicator = document.querySelector('.luxury-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.luxury-navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // 作品集图片加载动画
    const portfolioItems = document.querySelectorAll('.luxury-portfolio-item');
    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image');
        if (image) {
            image.addEventListener('load', () => {
                image.style.opacity = '1';
                image.style.transform = 'scale(1)';
            });
        }
    });

    // 文字渐入动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.luxury-section-title, .luxury-section-text, .luxury-portfolio-item').forEach(el => {
        observer.observe(el);
    });

    // 移动端菜单
    const menuBtn = document.querySelector('.nav-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
}); 