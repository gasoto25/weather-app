


const weatherForm = document.querySelector('form');
const search = document.getElementById('citySearch');
const weatherMessage = document.getElementById('weatherMessage');




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    weatherMessage.innerHTML = `
    <div class="d-flex align-content-center align-items-center mt-1">
    <div class="spinner-border mr-2" role="status"></div>
    <p class="text-white m-0"> Loading...</p>
    </div>`;

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {

            data.error ? weatherMessage.textContent = data.error :
                weatherMessage.textContent = `The weather in ${data.location}, is ${data.temp} degrees and it is ${data.forecast.toLowerCase()} out.`;
        })
    })
});