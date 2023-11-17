import '../../node_modules/nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';

export default function rangeSlider() {
    noUiSlider.create(slider, {
        start: [50, 200],
        connect: true,
        step: 5,
        tooltips: [
            { to: function(value) { return value+'$'; } },
            { to: function(value) { return value+'$'; } }
        ],
        range: {
            'min': 0,
            'max': 250
        }
    })
}
