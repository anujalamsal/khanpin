document.addEventListener('DOMContentLoaded', () => {
    const provinces = {
        province1: ['Bambaisan|bambaisan.html', 'Tongba|tongba.html', 'Kinema|kinema.html'],
        province2: ['Taruwa|taruwa.html', 'Bagiya|bagiya.html', 'Dal puri|dalpuri.html'],
        province3: ['Samaybaji|samay baji.html', 'Jujudhau|jujudhau.html', 'Chatamari|chatamari.html'],
        province4: ['Chukauni|chukauni.html', 'Arsa|arsa.html', 'Batuk|batuk.html'],
        province5: ['Rabdi|rabdi.html', 'Sidhra|sidhra.html', 'Anadikokheer|anadi ko kheer.html'],
        province6: ['Thenthuk|thenthuk.html', 'Tarul|tarul.html','Chyang|chyang.html'],
        province7: ['Fapar ko guldu|faparkoguldu.html', 'Kachari bariya|kachari.html', 'Kanchemba|kanchemba.html']
    };

    const map = document.getElementById('nepalMap');
    const dishesList = document.getElementById('dishesList');

    map.addEventListener('click', (event) => {
        const provinceId = event.target.id;
        const dishes = provinces[provinceId] || [];
        displayDishes(dishes);
    });

    function displayDishes(dishes) {
        dishesList.innerHTML = '';
        dishes.forEach(dish => {
            const dishInfo = dish.split('|');
            const dishName = dishInfo[0];
            const dishURL = dishInfo[1];
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = dishName;
            link.href = dishURL;
            link.target = '_blank';
            li.appendChild(link);
            dishesList.appendChild(li);
        });
    }
});
