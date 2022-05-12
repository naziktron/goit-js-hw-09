import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const feedbackData = {};



 const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFeedbackform, 500));
form.addEventListener('submit', onFormSubmit);

saveTextOnFeedbackForm();

function saveTextOnFeedbackForm() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  if (saveMessage) {
    const {email , message} = JSON.parse(saveMessage);
    form.email.value = email;
    form.message.value = message;
    feedbackData.email = email;
    feedbackData.message = message;
  }

}

function onFeedbackform(e) {
  feedbackData.email = form.elements.email.value;
  feedbackData.message = form.elements.message.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const formDataToSend = new FormData(e.currentTarget);
  formDataToSend.forEach((value,name)=> {
      feedbackData[name] = value;
  });
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(feedbackData);

}


