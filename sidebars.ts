import sidebarsEn from './sidebars/en';

function getSidebarsForLocale() {
    switch (process.env.DOCUSAURUS_CURRENT_LOCALE || 'en') {
        case 'en':
        default:
            return sidebarsEn
    }
}

export default getSidebarsForLocale()