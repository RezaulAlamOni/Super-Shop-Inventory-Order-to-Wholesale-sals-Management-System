
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

import handyProductOrderPlaceKouri from './components/handy-product-order-place-kouri'
import handyProductOrderPlace from './components/handy-product-order-place'
import handyProductOrderReceive from './components/handy-product-order-receive'
import handyProductInventoryTempTanaUpdate from './components/handy-product-inventory-tmp-tana-update'
import handyProductInventoryInquiry from './components/handy-product-inventory-inquiry'
import handyProductInventoryReturn from './components/handy-product-inventory-return'
import handyOrderShipmentList from './components/handy-order-shipment-list'
import handyVendorMaster from './components/handy-vandor-master'
import handyCustomerMaster from './components/handy-customer-master'
import barCodeScan from './components/barcode-scan'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components : {
        'handy-product-order-kouri' : handyProductOrderPlaceKouri,
        'handy-product-order' : handyProductOrderPlace,
        'handy-product-receive' : handyProductOrderReceive,
        'handy-product-inventory-update' : handyProductInventoryTempTanaUpdate,
        'handy-product-inventory-inquiry' : handyProductInventoryInquiry,
        'handy-product-inventory-return' : handyProductInventoryReturn,
        'handy-order-shipment-list' : handyOrderShipmentList,
        'bar-code-scan' : barCodeScan,
        'handy-vendor-master' : handyVendorMaster,
        'handy-customer-master' : handyCustomerMaster
    }
});
