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

    document.addEventListener('DOMContentLoaded', function () {
      contactForm.addEventListener('submit', function (e) {
          e.preventDefault();
  
          // バリデーションの呼び出し
          if (validateForm()) {
              // フォームがバリデーションを通過した場合、microCMSにデータを送信する処理を追加
              submitToMicroCMS();
          }
      });
    });



    // const validateNameForm = ()=>{

    // }
    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const textarea = document.getElementById("form-textarea").value;
    const telInput = document.getElementById("form-tel");

    

    const emailError = document.getElementById("error-email");
    const telError = document.getElementById("error-tel");
    const textareaError = document.getElementById("error-textarea");
    const nameError = document.getElementById("error-name");
    

    nameInput.addEventListener('blur',(e)=>{
      if (e.target.value.trim() === "") {
        nameError.innerHTML = "お名前を入力してください";
      } 
    })


    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailInput.addEventListener('blur',(e)=>{
      if (e.target.value.trim() === "") {
        emailError.innerHTML = "メールアドレスを入力してください";
      }else if(!emailRegex.test(e.target.value)){
        emailError.innerHTML = "有効なメールアドレスを入力してください";
      }
    })


    // 電話番号のバリデーション
    const phoneRegex = /^\d+$/;
    telInput.addEventListener('blur',(e)=>{
      if (!e.target.value.trim() == "" && !phoneRegex.test(e.target.value)) {
        telError.innerHTML = "有効な電話番号を入力してください";
      } 
    })
    

    const validateForm = ()=>{
      nameError.innerHTML = "";
      emailError.innerHTML = "";
      textareaError.innerHTML = "";
      telError.innerHTML = "";

      // メールアドレスのバリデーション
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailText.trim() === "") {
        emailError.innerHTML += "メールアドレスを入力してください";
      }else if(!emailRegex.test(emailText)){
        emailError.innerHTML += "有効なメールアドレスを入力してください";
      }

      


      // お問い合わせ内容のバリデーション
      if (textarea.trim() === "") {
          textareaError.innerHTML = "お問い合わせ内容を入力してください";
          return false;
      }

      // 送信ボタンの有効/無効を設定
      // submitBtn.disabled = !isValid;
  
      return true;
    };



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