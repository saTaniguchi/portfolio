class Hoge {

  constructor() {
    if (Common.getName('Contact')) {
      this.contact();
    } else if (Common.getName('Hoge_fuga')) {
      this.hoge_fuga();
    }
  }



  contact() {
    

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');

    document.addEventListener('DOMContentLoaded', function () {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
          submitToMicroCMS();
      });
    });

    


    // フォーム入力インプット
    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const telInput = document.getElementById("form-tel");
    const textareaInput = document.getElementById("form-textarea");

    // エラー表示箇所
    const emailError = document.getElementById("error-email");
    const telError = document.getElementById("error-tel");
    const textareaError = document.getElementById("error-textarea");
    const nameError = document.getElementById("error-name");

    // エラー文言
    const requiredErrorMsg = "必須入力項目です"
    const emailErrorMsg = "有効なメールアドレスを入力してください"
    const teleErrorMsg = "有効な電話番号を入力してください"

    // 各フォーム箇所の状態管理
    let isNameValid = true;
    let isEmailValid = true;
    let isTelValid = false;
    let isTextareaValid = true;


    let requiredClass = 'is-required'



    // 名前入力のバリデーション
    const nameInputCheck = ()=>{
      nameInput.addEventListener('blur',(e)=>{
        if (e.target.value.trim() === "") {
          nameError.classList.add(requiredClass)
          nameInput.classList.add(requiredClass);
          nameError.innerHTML = requiredErrorMsg;
          isNameValid = true;
        } else{
          nameError.classList.remove(requiredClass)
          nameInput.classList.remove(requiredClass);
          nameError.innerHTML = "";
          isNameValid = false;
        }
        updateSubmitBtnState();
      })
    }


    // メールアドレスのバリデーション
    const emailInputCheck = ()=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailInput.addEventListener('blur',(e)=>{
        const emailVal = e.target.value.replace(/[\s]/g, '');
        if (emailVal === "") {
          emailError.classList.add(requiredClass);
          emailInput.classList.add(requiredClass);
          emailError.innerHTML = requiredErrorMsg;
          isEmailValid = true; 
        }else if(!emailRegex.test(emailVal)){
          emailError.classList.add(requiredClass);
          emailInput.classList.add(requiredClass);
          emailError.innerHTML = emailErrorMsg;
          isEmailValid = true; 
        } else {
          emailError.classList.remove(requiredClass);
          emailInput.classList.remove(requiredClass);
          emailError.innerHTML = "";
          isEmailValid = false;
        }
        updateSubmitBtnState();
      })
    }


    // 電話番号のバリデーション
    const telInputCheck = ()=>{
      const phoneRegex = /^0[-\d]{9,12}$/;
      telInput.addEventListener('blur',(e)=>{
        const telVal = e.target.value.replace(/[- \s]/g, '');
        if (!telVal == "" && !phoneRegex.test(telVal)) {
          telError.classList.add(requiredClass);
          telInput.classList.add(requiredClass);
          telError.innerHTML = teleErrorMsg;
          isTelValid = true; 
        } else {
          telError.classList.remove(requiredClass);
          telInput.classList.remove(requiredClass);
          telError.innerHTML = "";
          isTelValid = false;
        }
        updateSubmitBtnState();
      })
    }


    // テキストエリアのバリデーション
    const textareaInputCheck = ()=>{
      textareaInput.addEventListener('blur',(e)=>{
        if (e.target.value.trim() === "") {
          textareaError.classList.add(requiredClass);
          textareaInput.classList.add(requiredClass);
          textareaError.innerHTML = requiredErrorMsg;
          isTextareaValid = true; 
        }  else {
          textareaError.classList.add(requiredClass);
          textareaInput.classList.remove(requiredClass);
          textareaError.innerHTML = "";
          isTextareaValid = false;
        }
        updateSubmitBtnState();
      })
    }

    
    const updateSubmitBtnState = () => {
      submitBtn.disabled = ((isNameValid || isEmailValid || isTelValid || isTextareaValid))   
    }
    
    updateSubmitBtnState();


    nameInputCheck();
    emailInputCheck();
    telInputCheck();
    textareaInputCheck();




  // MICROCMS お問い合わせ送信
  const submitToMicroCMS = () =>{
      const formData = new FormData(contactForm) 
      const apiUrl = 'https://myportfolio2107.microcms.io/api/v1/contact';
      const apiKey = 'XRcvtRPav49DOJO8XrKsPXW20SeLA3Pza0W9';

      // microCMSにデータを送信
      fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': apiKey,
          },
          body: JSON.stringify(Object.fromEntries(formData)),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          window.location.href = '../complete/'
      })
      .catch((error) => {
          console.error('Error:', error);
          alert('お問い合わせの送信に失敗しました。');
      });

  }
  }



  hoge_fuga() {
    return console.log('hoge_fuga');
  }
}

new Hoge();