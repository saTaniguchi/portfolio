class CommonBody {

  constructor() {
    this.smoothScroll();
    this.headerLoaded();
    this.footerYear();
    this.onClickHmbg();
    this.scrollObserver();
  }




  
  smoothScroll() {
    // twitterShare('i_target', 'i_url', 'i_text');
    const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < smoothScrollTrigger.length; i++){
      smoothScrollTrigger[i].addEventListener('click', (e) => {
        e.preventDefault();
        let href = smoothScrollTrigger[i].getAttribute('href');
        let targetElement = document.getElementById(href.replace('#', ''));
        const rect = targetElement.getBoundingClientRect().top;
        const offset = window.pageYOffset;
        const gap = 60;
        const target = rect + offset - gap;
        window.scrollTo({
          top: target,
          behavior: 'smooth',
        });
      });
    }
  }

  headerLoaded(){
    const header = document.getElementById('section-header');
    const headerChild = header.firstElementChild;
    window.addEventListener('DOMContentLoaded',() => header.classList.add('is-load'))
    if(location.pathname !=='/'){
      headerChild.style.borderBottom = "1px solid black"
    }
  }
  
  footerYear(){
    const footerCP = document.getElementById('footerYear');
    const date = new Date();
    const footerCurrent = date.getFullYear();
    footerCP.textContent = footerCurrent;
  }


  onClickHmbg(){
    //ハンバーガーメニュー全般
    const mediaQueryList = window.matchMedia('(min-width: 996px)');
    const html = document.documentElement;
    const hmbg = document.getElementById('js-header-hmbg');
    const headerNav = document.getElementById('js-header-nav');
    const headerNavLinks = document.querySelectorAll('.header_nav_list li a');


    const listener = (event) => {
        // リサイズ時に行う処理
        if (event.matches) {
            headerNav.classList.remove('is-show');
            headerNav.setAttribute('aria-hidden', false);
            hmbg.classList.remove('is-show');
            hmbg.setAttribute('aria-hidden', true);
            // hmbg.setAttribute('aria-expanded', false);
            html.classList.remove('is-menuOpen');
        } else {
            headerNav.setAttribute('aria-hidden', true);
            hmbg.setAttribute('aria-hidden', false);
            // hmbg.setAttribute('aria-expanded', true);
        }
    };
    mediaQueryList.addEventListener("change", listener);

    // 初期化処理
    listener(mediaQueryList);


    // ハンバーガーメニューの開閉
    let scrollpos;//スクロールの位置を入れる場所 
    hmbg.addEventListener('click',function(){
        this.classList.toggle('is-show');
        headerNav.classList.toggle('is-show');
        // if(hmbg.getAttribute('aria-expanded') === 'false' && (this.classList.contains('is-show')) ){
        if(headerNav.getAttribute('aria-hidden') === 'true'){
        // hmbg.setAttribute('aria-expanded', false);
        headerNav.setAttribute('aria-hidden', false);
        scrollpos = window.scrollY;
        document.body.style.top = scrollpos * -1 + 'px';
        html.classList.add('is-menuOpen');
        } 
        else {
        // hmbg.setAttribute('aria-expanded', true);
        headerNav.setAttribute('aria-hidden', true);
        html.classList.remove('is-menuOpen');
        window.scrollTo(0, scrollpos);
        }
    });


    for(let i=0; i<headerNavLinks.length;i++){
        headerNavLinks[i].addEventListener('click',()=>{
        headerNav.classList.remove('is-show');
        headerNav.setAttribute('aria-hidden', true);
        hmbg.classList.remove('is-show');
        html.classList.remove('is-menuOpen');
        })
    }
    
  }


  // スクロールチェック
  scrollObserver(){
    let scrollCheck = document.querySelectorAll('.js-io');
    const cb = function(entries){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('is-inview');
            } 
        });
    }

    const options = {
        threshold: .2
    }


    const io = new IntersectionObserver(cb,options);

    scrollCheck.forEach(v => {
        io.observe(v);
    });
  }

  
          
          // // ページ内リンクのスムーススクロール
          // for (const link of document.querySelectorAll('a[href*="#"]')) {
          //   link.addEventListener('click', (e) => {
          //     const hash = e.currentTarget.hash;
              
          //     // "#"と"#top"の時（ページトップへスクロール）
          //     if (!hash || hash === '#top') {
          //       e.preventDefault();
          //       window.scrollTo({
          //         top: 1, // iOSのChromeでfixedされた固定ヘッダーなどが動くバグがあるため0ではなく1に
          //         behavior: 'smooth',
          //       });
                
          //     // それ以外の時（アンカーへスクロール）
          //     } else {
          //       const target = document.getElementById(hash.slice(1));
          //       if (target) {
          //         e.preventDefault();
          //         const position = target.getBoundingClientRect().top + window.scrollY;
          //         window.scrollTo({
          //           top: position,
          //           behavior: "smooth",
          //         });
          
          //       }
          //     }
          //   });

}

new CommonBody();