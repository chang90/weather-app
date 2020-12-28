console.log('js is running')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result = document.querySelector('#result')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data) =>{
      if(data.error) {
        console.log(data.error)
      }
      console.log(data)
      result.textContent = data.forecastData
    }).catch((err) =>{
      console.log(error)
    })
  })
})