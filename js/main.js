let button = document.getElementsByClassName(`carousel-navigation`)[0];
let carouselSlides = document.getElementsByClassName(`carousel-slides`) [0];

let leftArrow = button.children[0];
leftArrow.setAttribute(`id`, `prev`);

let rightArrow = button.children[1];
rightArrow.setAttribute(`id`, `next`);

// eslint-disable-next-line no-unused-vars
function slides(info) {

    for(let i=0; i<info.data.length; i++) {

        let slide = document.createElement(`div`);
        slide.setAttribute(`id`, `slide`);
        carouselSlides.appendChild(slide);

        let album = document.createElement(`p`);
        album.setAttribute(`id`, `album`);
        album.textContent = info.data[i].album;
        slide.appendChild(album);

        let artist = document.createElement(`a`);
        artist.setAttribute(`id`, `artist`);
        artist.textContent = info.data[i].artist;
        artist.href = info.data[i].url;
        slide.appendChild(artist);

        let image = document.createElement(`img`);
        image.src = info.data[i].cover_image.path;
        slide.appendChild(image);

        let creditText = document.createElement(`p`);
        let credit = document.createElement(`a`);
        credit.setAttribute(`id`, `credit`);
        creditText.setAttribute(`id`, `creditText`);
        creditText.textContent = `Credit: `;
        credit.appendChild(creditText);
        credit.textContent += info.data[i].cover_image.credit;
        credit.href = info.data[i].cover_image.url;
        slide.appendChild(credit);

        let review = document.createElement(`p`);
        review.setAttribute(`id`, `review`);
        review.textContent = info.data[i].review.content;
        slide.appendChild(review);

        let sourceText = document.createElement(`p`);
        let source = document.createElement(`a`);
        source.setAttribute(`id`, `source`);
        sourceText.setAttribute(`id`, `emDash`);
        sourceText.textContent = `—`;
        source.appendChild(sourceText);
        source.textContent += info.data[i].review.source;
        source.href = info.data[i].review.url;
        slide.appendChild(source);
    }

    let slideIndex = 0;
    let translateX = 0;

    leftArrow.addEventListener(`click`, () => {
        slideIndex--;
        translateX += 640;
        carouselSlides.style.transform = `translateX(${translateX}px)`;

        if (slideIndex === 0) {
            leftArrow.style.visibility = `hidden`;
        }
        else {
            leftArrow.style.visibility = `visible`;
        }
    });

    rightArrow.addEventListener(`click`, () => {
        slideIndex++;
        translateX -= 640;
        carouselSlides.style.transform = `translateX(${translateX}px)`;

        if(slideIndex === 3) {
            rightArrow.style.visibility = `hidden`;
        }
        else {
            rightArrow.style.visibility = `hidden`;
        }
    });

    carouselSlides.style.transform = `translateX(${translateX}px)`;

    document.addEventListener(`keydown`, (event) => {
        if (event.key === `ArrowLeft`) {
            translateX += 640;
            carouselSlides.style.transform = `translateX(${translateX}px)`;
        }
        else if (event.key === `ArrowRight`) {
            translateX -= 640;
            carouselSlides.style.transform = `translateX(${translateX}px)`;
        }
    });
}

let script = document.createElement(`script`);
script.setAttribute(`src`, `json/data.json`);

let body = document.querySelector(`body`);
body.appendChild(script);
