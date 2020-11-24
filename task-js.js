import galleryImages from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    largeImage: document.querySelector('.lightbox__image'),
    backdrope: document.querySelector('.js-lightbox'),
    cloceModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay'),
};

const galeryElementRef = ({ preview, original, description, id }) =>
    `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
                data-id='${id}'
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>\n`;

const galeryMarcup = galleryImages.reduce((acc, img, i) => acc + galeryElementRef({ ...img, id: i }), ""); 
refs.gallery.innerHTML = galeryMarcup;

// const img = document.querySelector('.gallery__image');
// img.setAttribute("data-id", "0");

// const idImg = Number(img.dataset.id);
let currentImgId = null;

refs.gallery.addEventListener('click', openOriginalImg);
refs.gallery.addEventListener('click', openModal);
refs.cloceModalBtn.addEventListener('click', cloceModal);
refs.backdrope.addEventListener('click', backdropeCloceModal);

function openOriginalImg(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') { 
        return;
    }
    const imageRef = event.target;
    const originalImgURL = imageRef.dataset.source;
    const alt = imageRef.alt;
    const id = imageRef.dataset.id;
    setLergeImgSrc(originalImgURL, alt, id);    
};

function setLergeImgSrc(url, alt, id) {
    refs.largeImage.src = url;
    refs.largeImage.alt = alt;
    currentImgId = Number(id);
    console.log('open:', currentImgId);
};

function openModal() {
    window.addEventListener('keydown', pressKey);
    refs.backdrope.classList.add('is-open');
};
 
function cloceModal() {
    window.removeEventListener('keydown', pressKey);
    refs.backdrope.classList.remove('is-open');
    refs.largeImage.src = '';
    refs.largeImage.alt = '';
    currentImgId = null;
    console.log('close:', currentImgId);
};

function backdropeCloceModal(event) {
    if(event.target === refs.overlay) { 
        cloceModal();
    }
};

function pressKey({ code }) {
    code === 'Escape' && cloceModal();
    code === 'ArrowRight'&& nextImg();
    code === 'ArrowLeft' && prevImg();
};

function nextImg() { 
    currentImgId = galleryImages.length - 1 === currentImgId ? 0 : currentImgId + 1;
    console.log('slideR:', currentImgId);
    const { original, description } = galleryImages[currentImgId];
    refs.largeImage.src = original;
    refs.largeImage.alt = description;    
};

function prevImg() { 
    currentImgId = currentImgId === 0 ? galleryImages.length - 1 : currentImgId - 1;
    console.log('slideL:', currentImgId);
    const { original, description } = galleryImages[currentImgId];
    refs.largeImage.src = original;
    refs.largeImage.alt = description;
};