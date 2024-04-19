const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQS: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'final_register/:status',
    RESET_PASSWORD: 'reset_password/:token',


    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage_user',
    MANAGE_PRODUCT: 'manage_product',
    MANAGE_ORDER: 'manage_order',
    CREATE_PRODUCT: 'create_product',

    //User
    USER: 'user',
    PERSONAL: 'personal',
    MYCART: 'mycart',
    HISTORY: 'history',
    WISHLIST: 'wishlist',

}

export default path