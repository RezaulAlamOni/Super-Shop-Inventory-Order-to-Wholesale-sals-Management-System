
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

Vue.component('example-component', () => import(
    /* webpackChunkName: "example-component" */ './components/ExampleComponent.vue').default);
/*
import handyProductOrderPlaceKouri from './components/handy-product-order-place-kouri'
import handyProductOrderOnlineOrderKouri from './components/handy-product-online-order-kouri'
import handyProductOrdermail from './components/handy-product-order-mail'
import handyProductOrderConfirmKouri from './components/handy-product-order-confirm-kouri'
import handyProductOrderPlace from './components/handy-product-order-place'
import handyProductOrderReceive from './components/handy-product-order-receive'
import handyProductInventoryTempTanaUpdate from './components/handy-product-inventory-tmp-tana-update'
import handyProductInventoryInquiry from './components/handy-product-inventory-inquiry'
import handyProductInventoryMitsumry from './components/handy-mitsumury'
import handyProductInventoryReturn from './components/handy-product-inventory-return'
import handyOrderShipmentList from './components/handy-order-shipment-list'
import handyVendorMaster from './components/handy-vandor-master'
import handyCustomerMaster from './components/handy-customer-master'
import barCodeScan from './components/barcode-scan'*/

const mitshumoriSuper = ()=> import( /* webpackChunkName: "handy-product-order-place-kouri" */ './components/handy-mitshu-mori-received-item');
const handyProductOrderPlaceKouri = ()=> import( /* webpackChunkName: "handy-product-order-place-kouri" */ './components/handy-product-order-place-kouri');
const handyProductOrderOnlineOrderKouri = ()=> import( /* webpackChunkName: "handy-product-online-order-kouri" */ './components/handy-product-online-order-kouri');
const handyProductOrdermail = ()=> import( /* webpackChunkName: "handy-product-order-mail" */ './components/handy-product-order-mail');
const handyProductOrderConfirmKouri = ()=> import( /* webpackChunkName: "handy-product-order-confirm-kouri" */ './components/handy-product-order-confirm-kouri');
const handyProductOrderPlace = ()=> import( /* webpackChunkName: "handy-product-order-place" */ './components/handy-product-order-place');
const handyProductOrderReceive = ()=> import( /* webpackChunkName: "handy-product-order-receive" */ './components/handy-product-order-receive');
const handyProductInventoryTempTanaUpdate = ()=> import( /* webpackChunkName: "handy-product-inventory-tmp-tana-update" */ './components/handy-product-inventory-tmp-tana-update');
const handyProductInventoryInquiry = ()=> import( /* webpackChunkName: "handy-product-inventory-inquiry" */ './components/handy-product-inventory-inquiry');
const handyProductInventoryUpdate = ()=> import( /* webpackChunkName: "handy-product-inventory-inquiry" */ './components/handy-product-inventory-update');
const handyProductInventoryMitsumry = ()=> import( /* webpackChunkName: "handy-mitsumury" */ './components/handy-mitsumury');
const superAdminCustomerSuperManage = ()=> import( /* webpackChunkName: "admin-super-manage" */ './components/Admin/customers-list-manage');
const handyProductInventoryReturn = ()=> import( /* webpackChunkName: "handy-product-inventory-return" */ './components/handy-product-inventory-return');
const handyOrderShipmentList = ()=> import( /* webpackChunkName: "handy-order-shipment-list" */ './components/handy-order-shipment-list');
const handyVendorMaster = ()=> import( /* webpackChunkName: "handy-vandor-master" */ './components/handy-vandor-master');
const handyCustomerMaster = ()=> import( /* webpackChunkName: "handy-customer-master" */ './components/handy-customer-master');
const barCodeScan = ()=> import( /* webpackChunkName: "barcode-scan" */ './components/barcode-scan');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components : {
        'handy-mitshu-mori-received-item' : mitshumoriSuper,
        'handy-product-order-kouri' : handyProductOrderPlaceKouri,
        'handy-product-online-order-kouri' : handyProductOrderOnlineOrderKouri,
        'handy-product-order-mail' : handyProductOrdermail,
        'handy-product-order-confirm-kouri' : handyProductOrderConfirmKouri,
        'handy-product-order' : handyProductOrderPlace,
        'handy-product-receive' : handyProductOrderReceive,
        'handy-product-inventory-tana-update' : handyProductInventoryTempTanaUpdate,
        'handy-product-inventory-inquiry' : handyProductInventoryInquiry,
        'handy-product-inventory-update' : handyProductInventoryUpdate,
        'handy-product-inventory-mistumury' : handyProductInventoryMitsumry,
        'handy-product-inventory-return' : handyProductInventoryReturn,
        'handy-order-shipment-list' : handyOrderShipmentList,
        'bar-code-scan' : barCodeScan,
        'handy-vendor-master' : handyVendorMaster,
        'handy-customer-master' : handyCustomerMaster,
        'admin-customer-super-manage' : superAdminCustomerSuperManage,

    }
});
