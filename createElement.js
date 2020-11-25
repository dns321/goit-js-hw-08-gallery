import galleryImages from './gallery-items.js';
// console.table(galleryImages);

const refs = {
    $gallery: document.querySelector('.js-gallery'),
    $largeImage: document.querySelector('.lightbox__image'),
    $backdrope: document.querySelector('.js-lightbox'),
    $cloceModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    $overlay: document.querySelector('.lightbox__overlay'),
};

const {$gallery, $largeImage, $backdrope, $cloceModalBtn, $overlay } = refs;

const createGalleryMarkup = (({preview, original, description, id}) => {
    // Створюю елементи
    const itemLiRef = document.createElement('li');
    itemLiRef.classList.add('gallery__item');

    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    linkRef.setAttribute('href', original);

    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.setAttribute('data-id', id);
    imgRef.setAttribute('src', preview);
    imgRef.setAttribute('data-source', original);
    imgRef.setAttribute('alt', description);

    // Збираю до купи
    itemLiRef.appendChild(linkRef);
    linkRef.appendChild(imgRef);
    
    return itemLiRef;
});

const galeryMarcup = galleryImages.map((img, i) => createGalleryMarkup({ ...img, id: i}));

$gallery.append(...galeryMarcup);

let currentImgId = null;

$gallery.addEventListener('click', openOriginalImg);
$cloceModalBtn.addEventListener('click', cloceModal);
$backdrope.addEventListener('click', backdropeCloceModal);

function openOriginalImg(event) {
    event.preventDefault();
    const { dataset, alt, nodeName } = event.target;
    
    if (nodeName === 'IMG') { 
        const originalImgURL = dataset.source;
        const id = dataset.id;
        openModal(originalImgURL, alt, id);
    }        
};

function openModal(url, alt, id) {
    window.addEventListener('keydown', pressKey);
    $largeImage.src = url;
    $largeImage.alt = alt;
    currentImgId = Number(id);
    $backdrope.classList.add('is-open');
};
 
function cloceModal() {
    window.removeEventListener('keydown', pressKey);
    $backdrope.classList.remove('is-open');
    $largeImage.src = '';
    $largeImage.alt = '';
    currentImgId = null;
};

function backdropeCloceModal(event) {
    if(event.target === $overlay) { 
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
    $largeImage.src = original;
    $largeImage.alt = description;    
};

function prevImg() { 
    currentImgId = currentImgId === 0 ? galleryImages.length - 1 : currentImgId - 1;
    console.log('slideL:', currentImgId);
    const { original, description } = galleryImages[currentImgId];
    $largeImage.src = original;
    $largeImage.alt = description;
};



