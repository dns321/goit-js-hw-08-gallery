import galleryImages from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    largeImage: document.querySelector('.lightbox__image'),
    backdrope: document.querySelector('.js-lightbox'),
    cloceModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay'),
};

const galeryElementRef = ({ preview, original, description }) =>
    `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>\n`;

const galeryMarcup = galleryImages.reduce((acc, img) => acc + galeryElementRef(img), ""); 
refs.gallery.innerHTML = galeryMarcup;

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
    setLergeImgSrc(originalImgURL, alt);
};

function setLergeImgSrc(url, alt) {
    refs.largeImage.src = url;
    refs.largeImage.alt = alt;
};

function openModal() {
    window.addEventListener('keydown', cloceModalPressEsc);
    refs.backdrope.classList.add('is-open');
};
 
function cloceModal() {
    window.removeEventListener('keydown', cloceModalPressEsc);
    refs.backdrope.classList.remove('is-open');
    refs.largeImage.src = '';
    refs.largeImage.alt = '';
};

function backdropeCloceModal(event) {
    if(event.target === refs.overlay) { 
        cloceModal();
    }
};

function cloceModalPressEsc(event) {
    if (event.code === 'Escape') { 
        cloceModal();
        console.log('Press Esc');
        }
};

