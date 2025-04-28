// ナビゲーションメニューの制御
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// スクロール時のヘッダースタイル変更
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // 下スクロール
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // 上スクロール
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // モバイルメニューを閉じる
            navLinks.classList.remove('active');
        }
    });
});

// スクロールアニメーション
const scrollObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, scrollObserverOptions);

// アニメーション対象の要素を監視
document.querySelectorAll('.research-card, .publication-item, .person-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// アニメーション用のクラスを追加
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.research-card, .publication-item, .person-card, .section-header').forEach(el => {
        el.classList.add('fade-in');
    });
});

// コンタクトフォームの送信処理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // ここにフォーム送信の処理を追加
        console.log('送信されたデータ:', data);
        
        // 送信成功時の処理
        alert('お問い合わせありがとうございます。\n内容を確認次第、ご連絡させていただきます。');
        contactForm.reset();
    });
}

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// 画像の遅延読み込み
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, imageObserverOptions);
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// フェードインアニメーション
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.querySelectorAll('.research-card, .publications-list, .people-grid').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// フェードインアニメーションのスタイルを追加
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// テキストアニメーション
document.addEventListener('DOMContentLoaded', () => {
    // テキストアニメーション用のクラスを追加
    const animateTexts = document.querySelectorAll('.animate-text');
    animateTexts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        text.style.transitionDelay = `${index * 0.2}s`;
        
        // 少し遅延させてアニメーションを開始
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // 遅延テキストアニメーション
    const delayedTexts = document.querySelectorAll('.animate-text-delay');
    delayedTexts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        text.style.transitionDelay = `${0.5 + index * 0.2}s`;
        
        // 少し遅延させてアニメーションを開始
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 800);
    });
});

// ホバーエフェクトの強化
document.addEventListener('DOMContentLoaded', () => {
    // カードホバーエフェクト
    const cards = document.querySelectorAll('.research-card, .person-card, .publication-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 0 30px var(--neon-pink), 0 0 50px var(--neon-blue)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        });
    });
    
    // ボタンホバーエフェクト
    const buttons = document.querySelectorAll('.cta-button, .submit-button, .card-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// スクロールアニメーションの改善
const scrollAnimationElements = document.querySelectorAll('.research-card, .publication-item, .person-card, .section-header, .contact-container');
scrollAnimationElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(el);
});

// 新しいアニメーション効果
document.addEventListener('DOMContentLoaded', () => {
    // パーティクルエフェクト
    const hero = document.querySelector('.hero');
    if (hero) {
        const particleCount = 100; // パーティクル数を増やす
        const particles = document.createElement('div');
        particles.className = 'particles';
        hero.appendChild(particles);
        
        // カラーパレット
        const colors = [
            'var(--neon-pink)',
            'var(--neon-blue)',
            'var(--neon-green)',
            'var(--neon-yellow)',
            'var(--neon-purple)',
            'var(--neon-orange)'
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            
            // ランダムな色を適用
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = randomColor;
            particle.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}, 0 0 30px ${randomColor}`;
            
            // ランダムなサイズ
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particles.appendChild(particle);
        }
    }
    
    // 3D回転エフェクト
    const cards = document.querySelectorAll('.research-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // ネオン効果の強化
    const neonElements = document.querySelectorAll('h1, h2, h3, .card-icon, .cta-button, .submit-button');
    neonElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.textShadow = '0 0 20px var(--neon-pink), 0 0 30px var(--neon-pink), 0 0 40px var(--neon-pink), 0 0 50px var(--neon-pink)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.textShadow = '';
        });
    });
    
    // 背景に星を追加
    const sections = document.querySelectorAll('.research, .publications, .people, .contact, .footer');
    sections.forEach(section => {
        const stars = document.createElement('div');
        stars.className = 'stars';
        section.appendChild(stars);
        
        const starCount = 50;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            
            // ランダムな色を適用
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            star.style.backgroundColor = randomColor;
            star.style.boxShadow = `0 0 5px ${randomColor}, 0 0 10px ${randomColor}`;
            
            // ランダムなサイズ
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            stars.appendChild(star);
        }
    });
});

// アニメーション用のスタイルを追加
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* パーティクルエフェクト */
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }
    
    .particle {
        position: absolute;
        border-radius: 50%;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
        }
    }
    
    /* 星のエフェクト */
    .stars {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    }
    
    .star {
        position: absolute;
        border-radius: 50%;
        animation: twinkle linear infinite;
    }
    
    @keyframes twinkle {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    /* スクロールアニメーション */
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* テキストアニメーション */
    .animate-text, .animate-text-delay {
        opacity: 0;
        transform: translateY(20px);
    }
    
    /* ホバーエフェクト */
    .research-card, .person-card, .publication-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .cta-button, .submit-button, .card-link {
        transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* カラフルなアニメーション */
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .animate-rainbow {
        animation: rainbow 10s linear infinite;
    }
    
    /* ネオン効果 */
    .neon-text {
        text-shadow: 0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink), 0 0 30px var(--neon-pink);
    }
    
    .neon-border {
        box-shadow: 0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue), 0 0 30px var(--neon-blue);
    }
    
    /* 光るボタン */
    .glow-button {
        position: relative;
        overflow: hidden;
    }
    
    .glow-button::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
        transform: rotate(45deg);
        animation: shine 3s infinite;
    }
`;
document.head.appendChild(animationStyles);

document.addEventListener('DOMContentLoaded', function() {
    // メニュートグル
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // スクロール時のヘッダースタイル変更
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // スクロールアニメーション
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right, .animate-rotate-in').forEach(el => {
        observer.observe(el);
    });

    // コンタクトフォーム送信
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // ここにフォーム送信のロジックを追加
            alert('お問い合わせありがとうございます。');
            contactForm.reset();
        });
    }

    // パララックス効果
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // 画像の遅延読み込み
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // パーティクルエフェクト
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }

    // 動き回るボタン機能
    const buttons = document.querySelectorAll('.cta-button, .submit-button, .card-link');
    buttons.forEach(button => {
        let isMoving = false;
        let moveInterval;
        
        // マウスオーバーで動き始める
        button.addEventListener('mouseover', function(e) {
            if (!isMoving) {
                isMoving = true;
                startMoving(button);
            }
        });
        
        // マウスアウトで動きを止める
        button.addEventListener('mouseout', function() {
            isMoving = false;
            clearInterval(moveInterval);
            button.style.transition = 'all 0.3s ease';
            button.style.transform = 'translate(0, 0)';
        });
        
        // クリックで動きを止める
        button.addEventListener('click', function(e) {
            isMoving = false;
            clearInterval(moveInterval);
            button.style.transition = 'all 0.3s ease';
            button.style.transform = 'translate(0, 0)';
        });
    });
    
    // ボタンを動かす関数
    function startMoving(button) {
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        
        moveInterval = setInterval(() => {
            if (!isMoving) return;
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            button.style.position = 'fixed';
            button.style.left = randomX + 'px';
            button.style.top = randomY + 'px';
            button.style.transition = 'all 0.3s ease';
            
            // ランダムな回転も追加
            const randomRotate = Math.floor(Math.random() * 360);
            button.style.transform = `rotate(${randomRotate}deg)`;
        }, 1000);
    }
});

// ジャンプスケアーな仕掛け
document.addEventListener('DOMContentLoaded', function() {
    // ランダムな位置に突然現れる要素
    const createJumpScare = () => {
        const jumpScareElement = document.createElement('div');
        jumpScareElement.className = 'jump-scare';
        jumpScareElement.innerHTML = '👻';
        jumpScareElement.style.position = 'fixed';
        jumpScareElement.style.fontSize = '100px';
        jumpScareElement.style.zIndex = '9999';
        jumpScareElement.style.transition = 'all 0.3s ease';
        
        // ランダムな位置に配置
        const randomX = Math.floor(Math.random() * (window.innerWidth - 100));
        const randomY = Math.floor(Math.random() * (window.innerHeight - 100));
        jumpScareElement.style.left = randomX + 'px';
        jumpScareElement.style.top = randomY + 'px';
        
        document.body.appendChild(jumpScareElement);
        
        // 効果音を再生
        const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
        audio.play();
        
        // 3秒後に消える
        setTimeout(() => {
            jumpScareElement.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(jumpScareElement);
            }, 300);
        }, 3000);
    };
    
    // ランダムな間隔でジャンプスケアーを発生させる
    const startJumpScares = () => {
        const randomInterval = Math.floor(Math.random() * 30000) + 10000; // 10-40秒の間隔
        setTimeout(() => {
            createJumpScare();
            startJumpScares(); // 再帰的に呼び出し
        }, randomInterval);
    };
    
    // ページ読み込みから5秒後に開始
    setTimeout(startJumpScares, 5000);
    
    // マウスオーバーで突然変化する要素
    const addHoverJumpScare = () => {
        const elements = document.querySelectorAll('.research-card, .publication-item, .person-card');
        elements.forEach(element => {
            element.addEventListener('mouseover', () => {
                if (Math.random() < 0.3) { // 30%の確率で発生
                    const originalContent = element.innerHTML;
                    element.innerHTML = '👻';
                    element.style.fontSize = '100px';
                    element.style.textAlign = 'center';
                    element.style.transition = 'all 0.3s ease';
                    
                    // 効果音を再生
                    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
                    audio.play();
                    
                    // 1秒後に元に戻す
                    setTimeout(() => {
                        element.innerHTML = originalContent;
                        element.style.fontSize = '';
                        element.style.textAlign = '';
                    }, 1000);
                }
            });
        });
    };
    
    addHoverJumpScare();
    
    // スクロール時に突然現れる要素
    const addScrollJumpScare = () => {
        let hasTriggered = false;
        window.addEventListener('scroll', () => {
            if (!hasTriggered && window.scrollY > window.innerHeight * 2) {
                hasTriggered = true;
                
                const jumpScareOverlay = document.createElement('div');
                jumpScareOverlay.className = 'jump-scare-overlay';
                jumpScareOverlay.style.position = 'fixed';
                jumpScareOverlay.style.top = '0';
                jumpScareOverlay.style.left = '0';
                jumpScareOverlay.style.width = '100%';
                jumpScareOverlay.style.height = '100%';
                jumpScareOverlay.style.backgroundColor = 'black';
                jumpScareOverlay.style.zIndex = '9998';
                jumpScareOverlay.style.display = 'flex';
                jumpScareOverlay.style.justifyContent = 'center';
                jumpScareOverlay.style.alignItems = 'center';
                jumpScareOverlay.style.transition = 'all 0.3s ease';
                
                const jumpScareImage = document.createElement('img');
                jumpScareImage.src = 'https://i.imgur.com/example.jpg'; // 実際の画像URLに置き換えてください
                jumpScareImage.style.maxWidth = '80%';
                jumpScareImage.style.maxHeight = '80%';
                
                jumpScareOverlay.appendChild(jumpScareImage);
                document.body.appendChild(jumpScareOverlay);
                
                // 効果音を再生
                const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
                audio.play();
                
                // 1秒後に消える
                setTimeout(() => {
                    jumpScareOverlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(jumpScareOverlay);
                    }, 300);
                }, 1000);
            }
        });
    };
    
    addScrollJumpScare();
    
    // フォーム送信時にジャンプスケアー
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォーム送信の処理
            
            // ジャンプスケアーを表示
            const jumpScareMessage = document.createElement('div');
            jumpScareMessage.className = 'jump-scare-message';
            jumpScareMessage.innerHTML = '送信完了！...と思ったら... 👻';
            jumpScareMessage.style.position = 'fixed';
            jumpScareMessage.style.top = '50%';
            jumpScareMessage.style.left = '50%';
            jumpScareMessage.style.transform = 'translate(-50%, -50%)';
            jumpScareMessage.style.fontSize = '36px';
            jumpScareMessage.style.color = 'red';
            jumpScareMessage.style.zIndex = '9999';
            jumpScareMessage.style.textAlign = 'center';
            jumpScareMessage.style.transition = 'all 0.3s ease';
            
            document.body.appendChild(jumpScareMessage);
            
            // 効果音を再生
            const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
            audio.play();
            
            // 2秒後に消える
            setTimeout(() => {
                jumpScareMessage.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(jumpScareMessage);
                }, 300);
            }, 2000);
        });
    }
});

// いいね機能
const likeButtons = document.querySelectorAll('.action-buttons .fa-heart');
likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('liked');
        const postLikes = button.closest('.post').querySelector('.post-likes');
        const currentLikes = parseInt(postLikes.textContent);
        postLikes.textContent = button.classList.contains('liked') ? currentLikes + 1 : currentLikes - 1;
    });
});

// コメント投稿機能
const commentForms = document.querySelectorAll('.post-add-comment');
commentForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const comment = input.value.trim();
        
        if (comment) {
            const post = form.closest('.post');
            const commentsContainer = post.querySelector('.post-comments');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <span class="username">ユーザー名</span>
                <span class="comment-text">${comment}</span>
            `;
            commentsContainer.appendChild(newComment);
            input.value = '';
        }
    });
});

// ストーリー表示機能
const stories = document.querySelectorAll('.story-item');
stories.forEach(story => {
    story.addEventListener('click', () => {
        // ストーリー表示のロジックをここに実装
        console.log('ストーリーを表示:', story.querySelector('.story-username').textContent);
    });
});

// 画像の遅延読み込み
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ダークモード切り替え
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

prefersDarkScheme.addListener(toggleDarkMode);
toggleDarkMode();

// スクロールアニメーション
const scrollElements = document.querySelectorAll('.post, .story-item');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

scrollElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    scrollObserver.observe(element);
});

// プロフィール画像のホバーエフェクト
const profileImages = document.querySelectorAll('.profile-image img, .post-user img');
profileImages.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.1)';
    });
    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
    });
});

// フォロー機能
const followButtons = document.querySelectorAll('.follow-button');
followButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.textContent = button.textContent === 'フォロー' ? 'フォロー中' : 'フォロー';
        button.style.color = button.textContent === 'フォロー中' ? 'var(--light-text)' : 'var(--accent-color)';
    });
});
