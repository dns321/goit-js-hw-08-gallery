import galleryImages from './gallery-items.js';
console.table(galleryImages);

const refs = {
    $gallery: document.querySelector('.js-gallery'),
    $largeImage: document.querySelector('.lightbox__image'),
    $backdrope: document.querySelector('.js-lightbox'),
    $cloceModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    $overlay: document.querySelector('.lightbox__overlay'),
};

const {$gallery, $largeImage, $backdrope, $cloceModalBtn, $overlay } = refs;

const createGalleryMarkup = ((preview, original, description, id ) => {
    // Створюю елементи
    const itemLiRef = document.createElement('li');
    itemLiRef.classList.add('gallery__item');

    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    linkRef.setAttribute('href', '${original}');

    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.setAttribute('data-id', '${id}');
    imgRef.setAttribute//('src', '${preview}');
    imgRef.setAttribute('data-source', '${original}');
    imgRef.setAttribute('alt', '${description}');

    // Збираю до купи
    itemLiRef.appendChild(linkRef);
    linkRef.appendChild(imgRef);
    
    return itemLiRef;
});

console.log(createGalleryMarkup(galleryImages));

const galeryMarcup = galleryImages.reduce((acc, img, i) => acc + createGalleryMarkup({ ...img, id: i + 1 }), ""); 

console.log(galeryMarcup);

$gallery.innerHTML = galeryMarcup;




