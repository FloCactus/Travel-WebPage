let form = document.querySelector('#form');
form.addEventListener('submit',sendForm);

async function sendForm(e){
  e.preventDefault();

  let error = formValidation(form);

  let formData = new FormData(form);
  if(error === 0){
    form.classList.add('sending');
    let response = await fetch ('sendmail.php',{
      method:'POST',
      body: formData
    });
    if(response.ok){
      let result = await response.json();
      swal(result.message);
      form.reset();
      form.classList.remove('sending');
    }else{
      swal('Что-то пошло не так...');
      form.classList.remove('sending');
    }
  }else{
    swal('Заполните обязательные поля, пожалуйста!')
  }
}

function formValidation(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for(let i=0; i<formReq.length; i++){
      let input = formReq[i];

      formRemoveError(input);

        if(input.classList.contains('.email')){
            if(emailTest(input)){
              error++;
            }
        }else{
            if(input.value === ''){
              formAddError(input);
              error++;
            }
        }
    }
    return error;
}

function formAddError(input){
  input.parentElement.classList.add('error');
  input.classList.add('error');
}
function formRemoveError(input){
  input.parentElement.classList.remove('error');
  input.classList.remove('error');
}
function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
