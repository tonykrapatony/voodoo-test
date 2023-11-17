import getProducts from "./getProducts";
import renderProducts from "./renderProducts";
import rangeSlider from './rangeSlider';

export default function app() {
    document.addEventListener('DOMContentLoaded', function () {

        renderProducts();
        rangeSlider();

        document.getElementById('show_filters').addEventListener('click', () => {
          document.querySelector('.products_filters').classList.toggle('open');
        })

        document.querySelector('.burger').addEventListener('click', () => {
            document.querySelector('header .header_content nav ul').classList.toggle('show');
        })
    });
}
