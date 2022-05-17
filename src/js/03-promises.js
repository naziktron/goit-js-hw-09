import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  const data = {
    amount: parseInt(e.currentTarget.amount.value),
    step: parseInt(e.currentTarget.step.value),
    delay: parseInt(e.currentTarget.delay.value),
  };
  callPromiseCreation(data);
}

function callPromiseCreation({ amount, step, delay }) {
  let calculatedDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, calculatedDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    calculatedDelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
