document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子系统
    const particlesContainer = document.querySelector('.particles-container');
    const particles = new ParticleSystem(particlesContainer);

    // 获取名字元素
    const nameElement = document.querySelector('.name-highlight');
    const blurContainer = document.querySelector('.blur-container');

    // 添加鼠标事件监听器
    nameElement.addEventListener('mouseenter', () => {
        blurContainer.style.backdropFilter = 'blur(0px)';
        blurContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        nameElement.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
    });

    nameElement.addEventListener('mouseleave', () => {
        blurContainer.style.backdropFilter = 'blur(10px)';
        blurContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        nameElement.style.textShadow = 'none';
    });

    // 添加波浪手动画
    const wave = document.querySelector('.wave');
    wave.style.display = 'inline-block';
    wave.style.transform = 'rotate(0deg)';
    
    function animateWave() {
        wave.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(20deg)' },
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(20deg)' },
            { transform: 'rotate(0deg)' }
        ], {
            duration: 2000,
            iterations: Infinity
        });
    }
    
    animateWave();
}); 