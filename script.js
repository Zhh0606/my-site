// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 移动端菜单切换
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // 汉堡菜单动画
  navToggle.classList.toggle('active');
});

// 点击导航链接后关闭菜单
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== 滚动渐入动画 =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 为所有 section 添加渐入效果
document.querySelectorAll('.section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// 为卡片添加渐入效果
document.querySelectorAll('.stat-card, .hobby-card, .gallery-item, .timeline-item').forEach((el, index) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// ===== 导航栏活跃链接高亮 =====
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = '';
        link.style.fontWeight = '600';
      } else {
        link.style.fontWeight = '400';
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ===== 平滑滚动（兼容处理）=====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== 页面加载完成动画 =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// 初始状态
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
