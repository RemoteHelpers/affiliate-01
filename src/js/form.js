const fields = [
  {
    type: 'text',
    name: 'client_name',
    placeholder: 'Your name',
    required: true,
    label: 'Name*',
  },
  {
    type: 'email',
    name: 'client_email',
    placeholder: 'Email',
    required: true,
    label: 'E-mail*',
  },
  {
    type: 'tel',
    name: 'client_phone',
    placeholder: '+xxxxxxxxxxxx',
    required: false,
    pattern: '',
    label: 'Phone number*',
  },
  {
    type: 'text',
    name: 'note',
    required: false,
    placeholder: '9 a.m. - 6 p.m.',
    label: 'Better time for call',
  },
  {
    type: 'text',
    name: 'global_company_name',
    placeholder: 'Your company',
    required: false,
    hidden: true,
    value: 'Remote Helpers',
  },
  {
    type: 'text',
    name: 'project_company',
    placeholder: 'Your company',
    required: false,
    hidden: true,
    value: 'business.rh-s.com',
  },
  {
    type: 'text',
    name: 'promocode',
    hidden: true,
    value: 'MVO1Z1W21WOS',
  },
  {
    type: 'textarea',
    name: 'looking',
    placeholder: 'Your message',
    required: false,
    label: 'What are you looking for?',
  },
];
const refs = {
  backdrop: document.querySelector('.backdrop'),
  modalBtn: document.querySelector('.modal-btn'),
  form: document.querySelector('.form'),
  calandly: document.querySelector('.calendly-inline-widget'),
  pixel: document.querySelector('.backdrop .pixel-container'),
};
const url = 'https://crm-s.com/api/v1/leads-public';
window.addEventListener(
  'DOMContentLoaded',
  drowForm(fields, '.form .label-container'),
);
function drowForm(fields, selector) {
  const formRef = document.querySelector(selector);
  formRef.insertAdjacentHTML('beforeend', buildInputs(fields));
}
function buildInputs(formFields) {
  let str = '';
  let openLabel = '';
  let closeLabel = '';
  formFields.forEach(field => {
    if (field.label) {
      openLabel = `<label>${field.label}`;
      closeLabel = `</label>`;
    } else {
      openLabel = '';
      closeLabel = '';
    }
    switch (field.type) {
      case 'textarea':
        str += `${openLabel}<textarea ${
          field.name ? `name="${field.name}"` : ''
        } cols="30" rows="5" ${
          field.placeholder ? `placeholder="${field.placeholder}"` : ''
        } ${field.hidden ? `hidden` : ''} ${
          field.required ? 'required' : ''
        }></textarea>${closeLabel}`;
        break;
      case 'select':
        if (!field.options || !field.options.length) {
          break;
        }
        str += `<select ${field.name ? `name="${field.name}"` : ''} ${
          field.required ? 'required' : ''
        }>${field.options
          .map(option => `<option>${option.value}</option>`)
          .join('')}</select>`;
        break;
      default:
        str += `${openLabel}<input type="${field.type}" ${
          field.class ? `class="${field.class}"` : ''
        } ${field.id ? `id="${field.id}"` : ''} ${
          field.name ? `name="${field.name}"` : ''
        } ${field.value ? `value="${field.value}"` : ''} ${
          field.placeholder ? `placeholder="${field.placeholder}"` : ''
        } ${field.required ? 'required' : ''} ${
          field.pattern ? `pattern="${field.pattern}"` : ''
        } ${field.hidden ? 'hidden' : ''}>${closeLabel}`;
    }
  });
  return str;
}

refs.form.addEventListener('submit', formZipSubmit);

function formZipSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const note = formData.get('note');
  const looking = formData.get('looking');
  formData.set('note', `Time: ${note} Needs: ${looking}`);
  formData.delete('looking');

  const newArr = [];
  formData.forEach((value, name) => newArr.push([name, value]));
  const parsedData = Object.fromEntries(newArr);
  console.log(parsedData);

  addUserData(formData)
    .then(data => {
      openThankYouModal(parsedData);
      console.log(data);
    })
    .catch(error => console.log(error.message));
  refs.form.reset();
}
async function addUserData(userData) {
  const response = await fetch(url, {
    method: 'POST',
    body: userData,
  });
  return response.json();
}
async function openThankYouModal({ client_email, client_name }) {
  refs.backdrop.classList.add('is-visible');
  refs.modalBtn.addEventListener('click', closeThankYouModal);
  refs.backdrop.addEventListener('click', onBackDropClick);
  await fetch(
    `https://affiliateb2b.affiliationsoftware.app/script/track.php?cid=v08mw&cost=${client_email}&orderid=${client_name}&js`,
  )
    .then(response => response.json())
    .then(data => console.log(data));
}
function closeThankYouModal() {
  refs.backdrop.classList.remove('is-visible');
}
function onBackDropClick(e) {
  if (e.target === e.currentTarget) closeThankYouModal();
}
