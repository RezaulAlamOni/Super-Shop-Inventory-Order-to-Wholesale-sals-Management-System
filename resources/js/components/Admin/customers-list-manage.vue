<template>
    <section>
        <div id="user_main_message"></div>
        <div class="main-content-container container-fluid px-4">
            <!-- Page Header -->
            <div class="page-header row no-gutters py-4">
                <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
                    <!-- <span class="text-uppercase page-subtitle">Overview</span> -->
                    <h3 class="page-title">{{ title }}</h3>
                </div>
            </div>
            <!-- End Page Header -->
            <!-- Default Light Table -->
            <div class="row" id="div">
                <div class="col">
                    <div class="card card-small mb-4">
                        <div class="card-header border-bottom">
                            <h6 class="m-0">{{ title }}</h6>
                        </div>
                        <div class="card-body p-0 pb-3 text-center">
                            <table class="table mb-0">
                                <thead class="bg-light">
                                <tr>

                                    <th>販売先名</th>
                                    <th>コード</th>
                                    <th>電話</th>
                                    <th>
                                        <!-- <a href="" class="btn btn-primary float-right"><i class="mdi mdi-all-inclusive"></i><span class="hide-menu"> Create New </span></a> -->

                                        <button type="button" name='view' class="btn btn-primary float-righ"
                                                @click="createModelShow()"
                                                id="create_new">
                                            <i class="fas fa-plus-square"></i>
                                            <span class="hide-menu"> {{ table_headers.create_new }} </span>
                                        </button>

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <!--                                @foreach($users as $user)-->

                                <tr v-for="user in users">

                                    <td>{{ user.name }}</td>
                                    <td>{{ user.partner_code }}</td>
                                    <td>{{ user.phone }}</td>
                                    <td>
                                        <!--                                        @can('retrieve_users')-->
                                        <!--                                        <a href="{{Config::get('app.url').'user_update/'.user.id}}"-->
                                        <!--                                           class="btn btn-info"><i-->
                                        <!--                                            class="fas fa-eye"></i> {{__('messages.view')}}</a>-->
                                        <!--                                        @endcan-->
                                        <!--                                        @can('retrieve_users')-->
                                        <!--                                        <button type="button" class="btn btn-info permission_view"-->
                                        <!--                                                id="{{user.id}}"><i-->
                                        <!--                                            class="fas fa-edit"></i> {{__('messages.permission_view')}}-->
                                        <!--                                        </button>-->
                                        <!--                                        @endcan-->
                                        <!--                                        @can('update_users')-->
                                        <!--                                        <button type="button" class="btn btn-warning password_change"-->
                                        <!--                                                id="{{user.id}}"><i-->
                                        <!--                                            class="fas fa-edit"></i> {{__('messages.change_password')}}-->
                                        <!--                                        </button>-->
                                        <!--                                        @endcan-->
                                        <!--                                        @can('delete_users')-->
                                        <!--                                        <button type="button" class="btn btn-danger user_delete"-->
                                        <!--                                                id="{{user.id}}">-->
                                        <!--                                            <i class="fas fa-trash-alt"></i> {{__('messages.delete')}} </button>-->
                                        <!--                                        @endcan-->
                                    </td>
                                </tr>
                                <!--                                <?php $i++ ?>-->
                                <!--                                @endforeach-->

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <!-- End Default Light Table -->
            <!-- add edit maker modal -->
            <div class="modal fade" id="customers_reg_modal" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="maker_modal_heading">販売先情報</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="panel-heading text-center">
                            <div class="row">
                                <div class="col-sm-12 add_item_heading"></div>
                            </div>
                            <div id="add_customer_message">
                            </div>
                            <span class="text-danger">{{ error_msg }}</span>
                        </div>
                        <div class="modal-body">
                            <div class="panel-body buyer_reg_body">
                                <form>
                                    <div class="form-group row">
                                        <label for="customer_name" class="col-sm-4 col-form-label">販売先名</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control-plaintext" id="customer_name"
                                                   name="customer_name" v-model="customer.name">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="customer_code" class="col-sm-4 col-form-label">販売先コード</label>
                                        <div class="col-sm-8">
                                            <input type="tel" maxlength="6" class="form-control-plaintext"
                                                   name="customer_code"
                                                   id="customer_code" v-model="customer.code">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="customer_phone" class="col-sm-4 col-form-label">メイル</label>
                                        <div class="col-sm-8">
                                            <input type="email" class="form-control-plaintext" id="customer_email"
                                                   name="customer_email" v-model="customer.email" required>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="customer_phone" class="col-sm-4 col-form-label">電話番号</label>
                                        <div class="col-sm-8">
                                            <input type="number" class="form-control-plaintext" id="customer_phone"
                                                   name="customer_phone" v-model="customer.phone" required>
                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info " @click="saveCustomer()">追加</button>
                            <button type="button"
                                    class="btn btn-secondary ">閉じる
                            </button>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    </section>
</template>

<script>
export default {
    name: "customers-list-manage",
    props: ['supers', 'active', 'title', 'table_headers_','base_url'],
    data() {
        return {
            users: [],
            table_headers: {},
            customer: {},
            error_msg : ''

        }
    },
    mounted() {
        this.users = JSON.parse(this.supers)
        this.table_headers = JSON.parse(this.table_headers_)

    },
    methods: {
        createModelShow() {
            $('#customers_reg_modal').modal()
        },
        saveCustomer() {
            let _this = this;
            var setApiUrl = (base_url.indexOf('localhost') !== -1?'/rv3_tonyav1':'/rv3_superv1');

            let data = {
                customer_name: _this.customer.name,
                customer_code:  _this.customer.code,
                customer_phone:  _this.customer.phone,
                customer_email:  _this.customer.email,
                user_type: 2
            }

            axios.post(setApiUrl+'/customer_add_edit', data)
                .then(function (response) {
                    let data = response.data
                    if(data.message == 'success'){
                        _this.users = data.users;
                        $('#customers_reg_modal').modal('hide')
                    }
                    else {
                        _this.error_msg = data.message;
                    }
                })
                .catch(function (e) {
                    console.log(e)
                })
        }
    }
}
</script>

<style scoped>

</style>
