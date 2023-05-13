
const form = document.querySelector('form');
const saveBtn = document.getElementById('save-btn');
const downloadBtn = document.getElementById('download-btn');
const emailForm = document.getElementById('email-form');
const sendEmailBtn = document.getElementById('send-email-btn');


saveBtn.addEventListener('click', () => {

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());


  const dataString = JSON.stringify(data);

  
  localStorage.setItem('journal-entry', dataString);

  document.getElementById('email-form-container').classList.remove('hidden');
});

downloadBtn.addEventListener('click', () => {
 
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());


  const dataString = JSON.stringify(data);

 
  const blob = new Blob([dataString], { type: 'text/plain' });

  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'journal-entry.txt';
  link.click();
});


emailForm.addEventListener('submit', (e) => {
  e.preventDefault();

  
  const email = document.getElementById('email-input').value;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  
  const dataString = JSON.stringify(data);


  fetch('/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, data: dataString }),
  })
    .then(() => {
      
      document.getElementById('email-form-container').classList.add('hidden');
    
      alert('Journal entry sent to ' + email);
    })
    .catch(() => {
  
      alert('Error sending email');
    });
});
