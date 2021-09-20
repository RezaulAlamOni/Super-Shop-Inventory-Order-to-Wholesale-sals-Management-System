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
                                    <th>#</th>
                                    <th>{{ table_headers.name }}</th>
                                    <th>{{ table_headers.email }}</th>
                                    <th>
                                        <!-- <a href="" class="btn btn-primary float-right"><i class="mdi mdi-all-inclusive"></i><span class="hide-menu"> Create New </span></a> -->

                                        <button type="button" name='view' class="btn btn-primary float-righ"
                                                id="create_new">
                                            <i class="fas fa-plus-square"></i>
                                            <span class="hide-menu"> {{ table_headers.create_new }} </span>
                                        </button>

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
<!--                                @foreach($users as $user)-->

<!--                                <tr>-->
<!--                                    <td><?= $i; ?></td>-->
<!--                                    <td>{{$user->name}}-->
<!--                                        <input type="hidden" name="" id="user_name{{$user->id}}"-->
<!--                                               value="{{$user->name}} ">-->
<!--                                    </td>-->

<!--                                    <td>{{$user->email}}</td>-->
<!--                                    <td>-->
<!--                                        @can('retrieve_users')-->
<!--                                        <a href="{{Config::get('app.url').'user_update/'.$user->id}}"-->
<!--                                           class="btn btn-info"><i-->
<!--                                            class="fas fa-eye"></i> {{__('messages.view')}}</a>-->
<!--                                        @endcan-->
<!--                                        @can('retrieve_users')-->
<!--                                        <button type="button" class="btn btn-info permission_view"-->
<!--                                                id="{{$user->id}}"><i-->
<!--                                            class="fas fa-edit"></i> {{__('messages.permission_view')}}-->
<!--                                        </button>-->
<!--                                        @endcan-->
<!--                                        @can('update_users')-->
<!--                                        <button type="button" class="btn btn-warning password_change"-->
<!--                                                id="{{$user->id}}"><i-->
<!--                                            class="fas fa-edit"></i> {{__('messages.change_password')}}-->
<!--                                        </button>-->
<!--                                        @endcan-->
<!--                                        @can('delete_users')-->
<!--                                        <button type="button" class="btn btn-danger user_delete"-->
<!--                                                id="{{$user->id}}">-->
<!--                                            <i class="fas fa-trash-alt"></i> {{__('messages.delete')}} </button>-->
<!--                                        @endcan-->
<!--                                    </td>-->
<!--                                </tr>-->
<!--                                <?php $i++ ?>-->
<!--                                @endforeach-->

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <!-- End Default Light Table -->

        </div>
    </section>
</template>

<script>
export default {
    name: "customers-list-manage",
    props : ['supers','active','title','table_headers_'],
    data () {
        return{
            users : []

        }
    },
    mounted() {
        this.users = JSON.parse(this.supers)
        this.table_headers = JSON.parse(this.table_headers_)

    },
    methods :{

    }
}
</script>

<style scoped>

</style>
