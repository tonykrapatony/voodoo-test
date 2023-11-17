import getProductRecomend from "./getProductRecomend";
import getProducts from "./getProducts";

export default async function renderProducts() {
    const data = await getProducts(`https://voodoo-sandbox.myshopify.com/products.json?limit=461`);
    if (data) {
        const products = data.products;
        let result = '';
        products.forEach(el => {
            result += `
                <div class="products_item" id="${el.id}">
                    <div class="img_wrapper">
                        <img src="${
                            el.images.length !== 0 ? el.images[0].src : `./images/product.png`
                        }" alt="Product">
                    </div>
                    <h3>${el.title}</h3>
                    <div class="rate">
                        <svg width="81" height="19" viewBox="0 0 81 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
                            <path d="M33.0468 -6.10352e-05L35.666 5.63985L41.8393 6.38803L37.2848 10.6219L38.4809 16.7242L33.0468 13.7009L27.6128 16.7242L28.8089 10.6219L24.2544 6.38803L30.4276 5.63985L33.0468 -6.10352e-05Z" fill="#FFC633"/>
                            <path d="M56.8487 -6.10352e-05L59.4679 5.63985L65.6412 6.38803L61.0867 10.6219L62.2827 16.7242L56.8487 13.7009L51.4147 16.7242L52.6107 10.6219L48.0562 6.38803L54.2295 5.63985L56.8487 -6.10352e-05Z" fill="#FFC633"/>
                            <path d="M74.7641 16.7243L80.1981 13.701V0L77.5789 5.63991L71.4056 6.38809L75.9601 10.6219L74.7641 16.7243Z" fill="#FFC633"/>
                        </svg>
                        <p>3.5/<span>5</span></p>
                    </div>
                    <div class="price">
                        ${
                            el.variants.length > 0
                                ? getMinPriceVariant(el.variants)
                                : 'Price not available'
                        }
                    </div>
                </div>
            `;
        });
        document.querySelector('.products_list').innerHTML = result;

        function getMinPriceVariant(variants) {
            let minPriceVariant = variants[0]; // Припускаємо, що перший варіант має найменшу ціну
            for (const variant of variants) {
                const variantPrice = parseFloat(variant.price);
                const minPrice = parseFloat(minPriceVariant.price);
        
                if (variantPrice < minPrice) {
                    minPriceVariant = variant;
                }
            }
        
            return `
                <p>$${minPriceVariant.price}</p>
                ${
                    minPriceVariant.compare_at_price
                        ? `<p class="old_price">$${minPriceVariant.compare_at_price}</p>`
                        : ''
                }
            `;
        }

        document.querySelectorAll('.products_item').forEach(el => {
            el.addEventListener('click', async (e) => {
                const id = e.currentTarget.id;
                const clickedId = e.currentTarget.id;
                const clickedProduct = products.find(product => product.id.toString() === clickedId);
                let result = '';

                if (clickedProduct) {       

                    result = `
                        <div class="product">
                            <div class="img_wrapper">
                            ${clickedProduct.images.length > 0 ?
                                clickedProduct.images.map(image => `
                                    <img src="${image.src}" alt="${clickedProduct.title}">
                                `).join('')
                                : 'No images available'}
                            </div>
                            <div class="product_info">
                                <h3>${clickedProduct.title}</h3>
                                <div class="rate">
                                    <svg width="81" height="19" viewBox="0 0 81 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
                                        <path d="M33.0468 -6.10352e-05L35.666 5.63985L41.8393 6.38803L37.2848 10.6219L38.4809 16.7242L33.0468 13.7009L27.6128 16.7242L28.8089 10.6219L24.2544 6.38803L30.4276 5.63985L33.0468 -6.10352e-05Z" fill="#FFC633"/>
                                        <path d="M56.8487 -6.10352e-05L59.4679 5.63985L65.6412 6.38803L61.0867 10.6219L62.2827 16.7242L56.8487 13.7009L51.4147 16.7242L52.6107 10.6219L48.0562 6.38803L54.2295 5.63985L56.8487 -6.10352e-05Z" fill="#FFC633"/>
                                        <path d="M74.7641 16.7243L80.1981 13.701V0L77.5789 5.63991L71.4056 6.38809L75.9601 10.6219L74.7641 16.7243Z" fill="#FFC633"/>
                                    </svg>
                                    <p>3.5/<span>5</span></p>
                                </div>
                                <div class="price">
                                    ${clickedProduct.variants.length > 0 ?
                                        clickedProduct.variants.map((item, index) => `
                                            <div data-size="${item.option1}" data-color="${item.option2}" class="${index === 0 ? 'active' : ''}">
                                                <p>$${item.price}</p>
                                                ${item.compare_at_price ? `<p class="old_price">$${item.compare_at_price}</p>` : ``}
                                            </div>
                                        `).join('')
                                    : ''}
                                </div>
                                ${
                                    clickedProduct.body_html && clickedProduct.body_html.length > 0 ? 
                                    `<div class="description">${clickedProduct.body_html}</div>` :
                                    ``
                                }
                                <div class="colors">
                                    <h3>Select Colors</h3>
                                    ${clickedProduct.options && clickedProduct.options.length > 0 ?
                                        `<ul>
                                            ${clickedProduct.options.find(option => option.name === 'Color') ?
                                                clickedProduct.options.find(option => option.name === 'Color').values.map((item, index) => `
                                                    <li data-color="${item}" class="${index === 0 ? 'active' : ''}" style="background-color: ${item}">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.5306 5.03063L6.5306 13.0306C6.46092 13.1005 6.37813 13.156 6.28696 13.1939C6.1958 13.2317 6.09806 13.2512 5.99935 13.2512C5.90064 13.2512 5.8029 13.2317 5.71173 13.1939C5.62057 13.156 5.53778 13.1005 5.4681 13.0306L1.9681 9.53063C1.89833 9.46087 1.84299 9.37804 1.80524 9.28689C1.76748 9.19574 1.74805 9.09804 1.74805 8.99938C1.74805 8.90072 1.76748 8.80302 1.80524 8.71187C1.84299 8.62072 1.89833 8.53789 1.9681 8.46813C2.03786 8.39837 2.12069 8.34302 2.21184 8.30527C2.30299 8.26751 2.40069 8.24808 2.49935 8.24808C2.59801 8.24808 2.69571 8.26751 2.78686 8.30527C2.87801 8.34302 2.96083 8.39837 3.0306 8.46813L5.99997 11.4375L13.4693 3.96938C13.6102 3.82848 13.8013 3.74933 14.0006 3.74933C14.1999 3.74933 14.391 3.82848 14.5318 3.96938C14.6727 4.11028 14.7519 4.30137 14.7519 4.50063C14.7519 4.69989 14.6727 4.89098 14.5318 5.03188L14.5306 5.03063Z" fill="white"/>
                                                        </svg>                                                    
                                                    </li>
                                                `).join('')
                                                : '<li class="no_colors">No colors options available</li>'
                                            }
                                        </ul>
                                        `
                                        : '<p>No options available</p>'
                                    }
                                </div>
                                <div class="size">
                                    <h3>Choose Size</h3>
                                    ${clickedProduct.options && clickedProduct.options.length > 0 ?
                                        `<ul>
                                            ${clickedProduct.options.find(option => option.name === 'Size') ?
                                                clickedProduct.options.find(option => option.name === 'Size').values.map((item, index) => `
                                                    <li data-size="${item}" class="${index === 0 ? 'active' : ''}">
                                                        <p>${item}</p>
                                                    </li>
                                                `).join('')
                                                : '<li>No size options available</li>'
                                            }
                                        </ul>
                                        `
                                        : '<p>No options available</p>'
                                    }
                                    </ul>
                                </div>
                                <div class="actions">
                                    <div class="quantity">
                                        <button class="min">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z" fill="black"/>
                                            </svg>
                                        </button>
                                        <span>1</span>
                                        <button class="plus">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z" fill="black"/>
                                            </svg> 
                                        </button>
                                    </div>
                                    <button class="add_to_cart">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    result = 'Product not found';
                }

                document.querySelector('.pop_up .pop_up_content .top').innerHTML = result;
                document.querySelector('.pop_up').classList.add('open');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // для плавної прокрутки (не обов'язково)
                  });
                document.querySelector('.pop_up .close').addEventListener('click', () => {
                    document.querySelector('.pop_up').classList.remove('open');
                    $('.recomended_list').slick('unslick');
                })


                let price = document.querySelectorAll('.pop_up .product .price div');
                let colors = document.querySelectorAll('.pop_up .product .colors ul li');
                let sizes = document.querySelectorAll('.pop_up .product .size ul li');

                colors.forEach(el => {
                    el.addEventListener('click', (e) => {
                        price.forEach(el => {
                            el.classList.remove('active');
                        });
                        colors.forEach(el => {
                            el.classList.remove('active');
                        });

                        e.currentTarget.classList.add('active');

                        let color = e.currentTarget.getAttribute('data-color');
                        let size = document.querySelector('.pop_up .product .size ul li.active').getAttribute('data-size');

                        price.forEach(el => {
                            let opt_color = el.getAttribute('data-color');
                            let opt_size = el.getAttribute('data-size');
                            if (opt_color === color && opt_size === size) {
                                el.classList.add('active');
                            }
                        });
                    })
                });

                sizes.forEach(el => {
                    el.addEventListener('click', (e) => {
                        price.forEach(el => {
                            el.classList.remove('active');
                        });
                        sizes.forEach(el => {
                            el.classList.remove('active');
                        });

                        e.currentTarget.classList.add('active');

                        let size = e.currentTarget.getAttribute('data-size');
                        let color = document.querySelector('.pop_up .product .colors ul li.active').getAttribute('data-color');

                        price.forEach(el => {
                            let opt_color = el.getAttribute('data-color');
                            let opt_size = el.getAttribute('data-size');
                            if (opt_color === color && opt_size === size) {
                                el.classList.add('active');
                            }
                        });
                    })
                });

                let newQuantity;

                document.querySelector('.pop_up .product .actions .quantity .plus').addEventListener('click', () => {
                    let quantity = document.querySelector('.pop_up .product .actions .quantity span');
                    let quantityVal = Number(quantity.textContent);
                    newQuantity = ++quantityVal;
                    quantity.innerText = newQuantity;
                })
                document.querySelector('.pop_up .product .actions .quantity .min').addEventListener('click', () => {
                    let quantity = document.querySelector('.pop_up .product .actions .quantity span');
                    let quantityVal = Number(quantity.textContent);
                    if (quantityVal > 1) {
                        newQuantity = --quantityVal;
                        quantity.innerText = newQuantity;
                    } else {
                        quantity.innerText = 1;
                    }
                })

                const dataRecomend = await getProductRecomend(`https://voodoo-sandbox.myshopify.com/products.json??product_id=${clickedId}`);

                if (dataRecomend) {
                    const recomended = dataRecomend.products;
                    let result = '';
                    recomended.forEach(el => {
                        result += `
                            <div class="recomended_item">
                                <div class="img_wrapper">
                                    <img src="${
                                        el.images.length !== 0 ? el.images[0].src : `./images/product.png`
                                    }" alt="Product">
                                </div>
                                <h4>${el.title}</h4>
                                <div class="rate">
                                    <svg width="81" height="19" viewBox="0 0 81 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
                                        <path d="M33.0468 -6.10352e-05L35.666 5.63985L41.8393 6.38803L37.2848 10.6219L38.4809 16.7242L33.0468 13.7009L27.6128 16.7242L28.8089 10.6219L24.2544 6.38803L30.4276 5.63985L33.0468 -6.10352e-05Z" fill="#FFC633"/>
                                        <path d="M56.8487 -6.10352e-05L59.4679 5.63985L65.6412 6.38803L61.0867 10.6219L62.2827 16.7242L56.8487 13.7009L51.4147 16.7242L52.6107 10.6219L48.0562 6.38803L54.2295 5.63985L56.8487 -6.10352e-05Z" fill="#FFC633"/>
                                        <path d="M74.7641 16.7243L80.1981 13.701V0L77.5789 5.63991L71.4056 6.38809L75.9601 10.6219L74.7641 16.7243Z" fill="#FFC633"/>
                                    </svg>
                                    <p>3.5/<span>5</span></p>
                                </div>
                                <div class="price">
                                    ${
                                        el.variants.length > 0
                                            ? getMinPriceVariant(el.variants)
                                            : 'Price not available'
                                    }
                                </div>
                            </div>
                        `;
                    });
                    document.querySelector('.pop_up .bottom .recomended_list').innerHTML = result;
                    
                    $('.recomended_list').slick({
                        infinite: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: false,
                        variableWidth: true,
                        responsive: [
                            {
                              breakpoint: 768,
                              settings: {
                                slidesToScroll: 1
                              }
                            }
                        ]
                    });
                }
            })
        });


        window.addEventListener('resize', () => {
          init();
        })

        const itemsPerPage = 9;
        const totalItems = data.products.length;
        let currentPage = 1;
        
        const pagination = document.getElementById('pagination');
        const pageNumbers = document.getElementById('pageNumbers');
        const prevPageButton = document.getElementById('prevPage');
        const nextPageButton = document.getElementById('nextPage');
        const list = document.getElementById('list');
        
        function generatePageNumbers() {
            pageNumbers.innerHTML = '';
        
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            let maxPageButtons;
            if (window.innerWidth < 796) {
                maxPageButtons = 2;
            } else {
                maxPageButtons = 3;
            }
        
            let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
            let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
        
            if (totalPages - endPage < Math.floor(maxPageButtons / 2)) {
                startPage = Math.max(startPage - (Math.floor(maxPageButtons / 2) - (totalPages - endPage)), 1);
            }
        
            if (startPage > totalItems) {
                const ellipsisStart = document.createElement('button');
                ellipsisStart.innerText = '...';
                pageNumbers.appendChild(ellipsisStart);
            }
        
            for (let i = startPage; i <= endPage; i++) {
                const pageNumber = document.createElement('button');
                pageNumber.innerText = i;
        
                if (i === currentPage) {
                    pageNumber.classList.add('active');
                }
        
                pageNumber.addEventListener('click', () => {
                    currentPage = i;
                    updateList();
                    generatePageNumbers();
                });
        
                pageNumbers.appendChild(pageNumber);
            }
        
            if (totalPages - endPage >= 3) {
                const ellipsisEnd = document.createElement('button');
                ellipsisEnd.setAttribute('disable', true);
                ellipsisEnd.innerText = '...';
                pageNumbers.appendChild(ellipsisEnd);
        
                if (window.innerWidth < 796) {
                    for (let i = totalPages - 1; i <= totalPages; i++) {
                        const pageNumber = document.createElement('button');
                        pageNumber.innerText = i;
            
                        if (i === currentPage) {
                            pageNumber.classList.add('active');
                        }
            
                        pageNumber.addEventListener('click', () => {
                            currentPage = i;
                            updateList();
                            generatePageNumbers();
                        });
            
                        pageNumbers.appendChild(pageNumber);
                    }
                }  else {
                    for (let i = totalPages - 2; i <= totalPages; i++) {
                        const pageNumber = document.createElement('button');
                        pageNumber.innerText = i;
            
                        if (i === currentPage) {
                            pageNumber.classList.add('active');
                        }
            
                        pageNumber.addEventListener('click', () => {
                            currentPage = i;
                            updateList();
                            generatePageNumbers();
                        });
            
                        pageNumbers.appendChild(pageNumber);
                    }
                }
            }
        }    
        
        function updateList() {
          const start = (currentPage - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          const visibleItems = Array.from(list.children).slice(start, end);
        
          Array.from(list.children).forEach(item => {
            item.style.display = 'none';
          });
        
          visibleItems.forEach(item => {
            item.style.display = 'block';
          });
        }
        
        function setupPagination() {
          prevPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
              currentPage--;
              updateList();
              generatePageNumbers();
            }
          });
        
          nextPageButton.addEventListener('click', () => {
            if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
              currentPage++;
              updateList();
              generatePageNumbers();
            }
          });
        }
        
        function init() {
          updateList();
          generatePageNumbers();
          setupPagination();
        }
        
        init();
        

    }

}
