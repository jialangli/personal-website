// 移动端菜单切换
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // 向下滚动
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // 向上滚动
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// 作品集筛选功能
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // 筛选项目
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 从API获取博客文章
async function fetchBlogPosts() {
    try {
        const response = await fetch('/v1/posts?limit=3');
        const data = await response.json();
        
        if (data.code === 200) {
            const blogGrid = document.querySelector('.blog-grid');
            
            data.data.forEach(post => {
                const article = document.createElement('article');
                article.className = 'blog-card';
                article.innerHTML = `
                    <div class="blog-image">
                        <img src="${post.cover_image || 'assets/images/default-blog.jpg'}" alt="${post.title}">
                    </div>
                    <div class="blog-info">
                        <span class="blog-category">${post.category || '技术'}</span>
                        <h3><a href="/post.html?id=${post.id}">${post.title}</a></h3>
                        <p class="blog-excerpt">${post.excerpt || '点击阅读全文...'}</p>
                        <div class="blog-meta">
                            <span><i class="ph ph-calendar"></i> ${new Date(post.created_at).toLocaleDateString()}</span>
                            <span><i class="ph ph-clock"></i> ${post.reading_time || '5'}分钟阅读</span>
                        </div>
                    </div>
                `;
                blogGrid.appendChild(article);
            });
        }
    } catch (error) {
        console.error('获取博客文章失败:', error);
    }
}

// 页面加载完成后执行
if (document.querySelector('.blog-grid')) {
    fetchBlogPosts();
} 