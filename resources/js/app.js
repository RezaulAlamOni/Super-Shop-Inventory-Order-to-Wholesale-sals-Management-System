
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueSpeech from 'vue-speech'


Vue.use(VueSpeech)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('bar-code-scan', require('./components/barcode-scan'));

const handyProductOrderPlaceKouri =()=>import(/* webpackChunkName: "handyProductOrderPlaceKouri" */ './components/handy-product-order-place-kouri');
const handyProductOrderOnlineOrderKouri =()=>import(/* webpackChunkName: "handyProductOrderOnlineOrderKouri" */ './components/handy-product-online-order-kouri');
const handyProductOrdermail =()=>import(/* webpackChunkName: "handyProductOrdermail" */ './components/handy-product-order-mail');
const handyProductOrderConfirmKouri =()=>import(/* webpackChunkName: "handyProductOrderConfirmKouri" */ './components/handy-product-order-confirm-kouri');
// import handyProductOrderPlace from './components/handy-product-order-place';
const handyProductOrderPlace =()=>import(/* webpackChunkName: "handyProductOrderPlace" */ './components/handy-product-order-place');
const handyProductOrderReceive =()=>import(/* webpackChunkName: "handyProductOrderReceive" */ './components/handy-product-order-receive');
const handyProductInventoryTempTanaUpdate =()=>import(/* webpackChunkName: "handyProductInventoryTempTanaUpdate" */ './components/handy-product-inventory-tmp-tana-update');
const handyProductInventoryInquiry =()=>import(/* webpackChunkName: "handyProductInventoryInquiry" */ './components/handy-product-inventory-inquiry');
const handyProductInventoryMitsumry =()=>import(/* webpackChunkName: "handyProductInventoryMitsumry" */ './components/handy-mitsumury');
const handyProductInventoryReturn =()=>import(/* webpackChunkName: "handyProductInventoryReturn" */ './components/handy-product-inventory-return');
const handyOrderShipmentList =()=>import(/* webpackChunkName: "handyOrderShipmentList" */ './components/handy-order-shipment-list');
const handyVendorMaster =()=>import(/* webpackChunkName: "handyVendorMaster" */ './components/handy-vandor-master');
const handyCustomerMaster =()=>import(/* webpackChunkName: "handyCustomerMaster" */ './components/handy-customer-master');
const barCodeScan =()=>import(/* webpackChunkName: "barCodeScan" */ './components/barcode-scan');


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components : {
        'handy-product-order-kouri' : handyProductOrderPlaceKouri,
        'handy-product-online-order-kouri' : handyProductOrderOnlineOrderKouri,
        'handy-product-order-mail' : handyProductOrdermail,
        'handy-product-order-confirm-kouri' : handyProductOrderConfirmKouri,
        'handy-product-order' : handyProductOrderPlace,
        'handy-product-receive' : handyProductOrderReceive,
        'handy-product-inventory-update' : handyProductInventoryTempTanaUpdate,
        'handy-product-inventory-inquiry' : handyProductInventoryInquiry,
        'handy-product-inventory-mistumury' : handyProductInventoryMitsumry,
        'handy-product-inventory-return' : handyProductInventoryReturn,
        'handy-order-shipment-list' : handyOrderShipmentList,
        'bar-code-scan' : barCodeScan,
        'handy-vendor-master' : handyVendorMaster,
        'handy-customer-master' : handyCustomerMaster
    }
});
