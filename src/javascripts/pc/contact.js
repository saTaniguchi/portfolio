class Hoge {

  constructor() {
    if (Common.getName('Contact')) {
      this.contact();
      // this.validate();
    } else if (Common.getName('Hoge_fuga')) {
      this.hoge_fuga();
    }
  }

  validate() {
    function validateForm() {
      const name = document.getElementById("form-name").value;
      const email = document.getElementById("form-email").value;
      const textarea = document.getElementById("form-textarea").value;

      const nameError = document.getElementById("error-name");
      const emailError = document.getElementById("error-email");
      const telError = document.getElementById("error-tel");
      const textareaError = document.getElementById("error-textarea");


      nameError.innerHTML = "";
      emailError.innerHTML = "";1
      textareaError.innerHTML = "";

            let isValid = true;

            // お名前のバリデーション
            if (name.trim() === "") {
                nameError.innerHTML = "お名前を入力してください";
                isValid = false;
            }

            // メールアドレスのバリデーション
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.innerHTML = "有効なメールアドレスを入力してください";
                isValid = false;
            }

            // お問い合わせ内容のバリデーション
            if (textarea.trim() === "") {
                textareaError.innerHTML = "お問い合わせ内容を入力してください";
                isValid = false;
            }

            // 送信ボタンの有効/無効を設定
            document.getElementById("submit-btn").disabled = !isValid;

        return isValid;
    };
  }

  contact() {


    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      let formData = new FormData(this);
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
  });
  }



  hoge_fuga() {
    return console.log('hoge_fuga');
  }
}

new Hoge();