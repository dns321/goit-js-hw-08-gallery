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

let currentImgId = null;

refs.gallery.addEventListener('click', openOriginalImg);
refs.cloceModalBtn.addEventListener('click', cloceModal);
refs.backdrope.addEventListener('click', backdropeCloceModal);

function openOriginalImg(event) {
    event.preventDefault();
    const { dataset, alt, nodeName } = event.target;
    
    if (nodeName === 'IMG') {
        const originalImgURL = dataset.source;
        const id = dataset.id;
        openModal(originalImgURL, alt, id);
    }    
};

function setLergeImgSrc(url, alt, id) {
    refs.largeImage.src = url;
    refs.largeImage.alt = alt;
    currentImgId = Number(id);
};

function openModal(url, alt, id) {
    window.addEventListener('keydown', pressKey);
    refs.largeImage.src = url;
    refs.largeImage.alt = alt;
    currentImgId = Number(id);
    refs.backdrope.classList.add('is-open');
};
 
function cloceModal() {
    window.removeEventListener('keydown', pressKey);
    refs.backdrope.classList.remove('is-open');
    refs.largeImage.src = '';
    refs.largeImage.alt = '';
    currentImgId = null;
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
    const { original, description } = galleryImages[currentImgId];
    refs.largeImage.src = original;
    refs.largeImage.alt = description;    
};

function prevImg() { 
    currentImgId = currentImgId === 0 ? galleryImages.length - 1 : currentImgId - 1;
    const { original, description } = galleryImages[currentImgId];
    refs.largeImage.src = original;
    refs.largeImage.alt = description;
};