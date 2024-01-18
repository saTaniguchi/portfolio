import _ from 'lodash';

class Index {

  constructor() {
    if (Common.getName('Index')) {
      this.index();
      this.topFv();
      this.skillScrollObserver();
      this.wrapSplitSpan();
      this.swiper();
      this.gsapHorizonalScroll();
    }
  }


  index() {
    // ---handlebarsを使用せずに記述した例（うまく表示された）----

    // const workListInsert = (element) =>{
    //   const WorkLists = document.getElementById('topWorkList');
    //   let WorkListHtml = 
    //       `<li class="top-work_item">
    //         <a href="${element.id}">
    //           <div class="work_item_img">
    //             <img
    //             src="${element.img.url}"
    //             alt=""
    //             decoding="async"
    //             />
    //           </div>
    //           <h3 class="work_item_ttl">${element.title}</h3>
    //         </a>
    //       </li>`;
    //   WorkLists.innerHTML += WorkListHtml;
    // }

    // async function fetchMicoCMS(){
    //   const response = await fetch("https://myportfolio2107.microcms.io/api/v1/work", {
    //       headers: {
    //         "X-MICROCMS-API-KEY": 'XRcvtRPav49DOJO8XrKsPXW20SeLA3Pza0W9',
    //       },
    //   });
    //   const json = await response.json();
      // const source = document.getElementById('workList-template').innerHTML;
      // const template = Handlebars.compile(source);
      // const html = template({
      //   data: json.contents
      // })
      // _.forEach(json.contents, (element)=>{
      //   workListInsert(element);
      // });
    // }
    // fetchMicoCMS();


    // .catch((error) => console.error("エラーです:", error));
    //   return console.log('Index');
    // }
        // ---handlebarsを使用せずに記述した例----
  }


  // ファーストビューのアニメーション
  topFv() {
    const topFvList = document.querySelectorAll('.top-fv_list li');
    window.addEventListener('DOMContentLoaded', ()=>{
      topFvList.forEach(element =>{
          element.classList.add('is-load');
      });
    })
  }


  gsapHorizonalScroll() {
    window.addEventListener('load',()=>{
      const workItems  = document.querySelectorAll(".top-work_item");
      const workList  = document.querySelector(".top-work_list");
      const workListWidth  = workList.offsetWidth
      const topWork = document.getElementById("top-work");

      gsap.to(workList, {
        xPercent: -20 * (workItems.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: topWork,
          end: () => "+=" + workListWidth,          
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    })
      // window.addEventListener('load', ()=>{
      //   const slides = gsap.utils.toArray(".top-work_item");
      //   const wrapper = document.querySelector(".top-work_list");
      //   const wrapperWidth = wrapper.offsetWidth;
      //   // 横スクロールアニメーションの設定
      //   gsap.to(slides, {
      //     xPercent: -100 * (slides.length - 1), // -X軸方向に移動
      //     ease: "none", // アニメーションのイージング(noneは定速)
      //     scrollTrigger: {
      //       trigger: wrapper, // アニメーション開始のトリガー要素
      //       pin: true, // 要素を固定
      //       scrub: 1, // スクロール量に合わせてアニメーション
      //       end: `+=${wrapperWidth}`, // アニメーションが終わる位置
      //     },
      //   });

      // })
    }


  // スキル箇所の目次とスクロールを連動
  skillScrollObserver() {
    const boxes = document.querySelectorAll(".skill_info_box");
    const sKillBoxOptions = {
        root: null,
        rootMargin: "-50% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver(doWhenIntersect, sKillBoxOptions);
    boxes.forEach(box => {
        observer.observe(box);
    });


    function doWhenIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateIndex(entry.target);
            }
        });
    }

    function activateIndex(element) {
        const currentActiveIndex = document.querySelector("#indexList .is-active");
        if (currentActiveIndex !== null) {
            currentActiveIndex.classList.remove("is-active");
        }   
        const newActiveIndex = document.querySelector(`#indexList a[href*='#${element.id}']`);
        newActiveIndex.classList.add("is-active");
    }
  }


  // spanでテキスト囲み
  wrapSplitSpan(){
    const wrapCharSpan = function(str){
      return [...str].map(char => `<span>${char}</span>`).join('');
      }
      const targets = document.querySelectorAll('.js-span-wrap-text');
      targets.forEach((target) => {
      target.innerHTML = wrapCharSpan(target.textContent);
    });
  }


  // swiper
  swiper(){
    const mySwiper = new Swiper('.swiper', {
        loop: true,
        loopAdditionalSlides: 5,
        slidesPerView: 5,
        speed: 6000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        breakpoints: {
          375: {
            slidesPerView: 1.5
          },
          568: {
              slidesPerView: 2
          },
          768: {
              slidesPerView: 2.5
          },
          1280: {
              slidesPerView: 3.5
          },
          1920: {
              slidesPerView: 4.5
          },
        }
      });
    }
  }


new Index();