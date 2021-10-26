const BASE_URL = 'https://movie-list.alphacamp.io';
const INDEX_URL = BASE_URL + '/api/v1/movies/';
const POSTER_URL = BASE_URL + '/posters/';

const movies = [];

const dataPanel = document.querySelector('#data-panel');

function renderMovieList(data) {
    let rawHTML = '';

    data.forEach((item) => {
        rawHTML += `<div class="col-sm-3">
                <div class="mb-2">
                    <div class="card">
                        <img src="${POSTER_URL + item.image}"
                            class="card-img-top" alt="Movie Poster" />
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${
                                item.id
                            }">More</button>
                            <button class="btn btn-info btn-add-favorite">+</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>`;
    });

    dataPanel.innerHTML = rawHTML;
}

function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-title-model');
    const modalImage = document.querySelector('#movie-modal-image');
    const modalDate = document.querySelector('#movie-modal-date');
    const modalDescription = document.querySelector('#movie-modal-description');
    //先設計空值，資料轉換時就不會留有上一筆暫存
    modalImage.innerHTML = '';
    axios.get(INDEX_URL + id).then((response) => {
        const data = response.data.results;
        modalTitle.innerText = data.title;
        modalDate.innerText = 'Release Date: ' + data.release_date;
        modalDescription.innerText = data.description;
        modalImage.innerHTML = `
            <img
                src="${POSTER_URL + data.image}"
                    alt="movie-poster"
                        class="img-fuid"
                                            />`;
    });
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        // console.log(event.target.dataset);
        showMovieModal(Number(event.target.dataset.id));
    }
});

axios
    .get(INDEX_URL)
    .then((response) => {
        movies.push(...response.data.results);
        renderMovieList(movies);
    })
    .catch((err) => console.log(err));
