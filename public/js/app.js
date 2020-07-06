const weather_form = document.querySelector('form')
const search_element = document.querySelector('input')
const msgone = document.querySelector('#message-1')
const msgtwo = document.querySelector('#message-2')

weather_form.addEventListener('submit', (e) => {
    if (search_element) {
        e.preventDefault()
        const location = search_element.value
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msgone.textContent = data.error
                } else {
                    msgone.textContent = data.location
                    msgtwo.textContent = data.forecast

                }


            })
        })

    }
})