@extends('backend.layouts.master')
@section('title')
    <title>{{__('messages.manage_users')}}</title>
@endsection

@section('content')
    @include('backend.flash_message.flash_message')

    <admin-customer-super-manage supers="{{ $users }}" title="{{ $title }}"
                                 table_headers_="{{ json_encode(['name' =>  __('messages.name') ,'email' => __('messages.email'),'create_new' =>  __('messages.create_new') ]) }}"
    ></admin-customer-super-manage>


{{--    @can('retrieve_users')--}}
{{--        <div id="user_main_message"></div>--}}
{{--        <div class="main-content-container container-fluid px-4">--}}
{{--            <!-- Page Header -->--}}
{{--            <div class="page-header row no-gutters py-4">--}}
{{--                <div class="col-12 col-sm-4 text-center text-sm-left mb-0">--}}
{{--                    <!-- <span class="text-uppercase page-subtitle">Overview</span> -->--}}
{{--                    <h3 class="page-title">{{$title}}</h3>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <!-- End Page Header -->--}}
{{--            <!-- Default Light Table -->--}}
{{--            <div class="row" id="div">--}}
{{--                <div class="col">--}}
{{--                    <div class="card card-small mb-4">--}}
{{--                        <div class="card-header border-bottom">--}}
{{--                            <h6 class="m-0">{{$title}}</h6>--}}
{{--                        </div>--}}
{{--                        <div class="card-body p-0 pb-3 text-center">--}}
{{--                            <table class="table mb-0">--}}
{{--                                <thead class="bg-light">--}}
{{--                                <tr>--}}
{{--                                    <th>#</th>--}}
{{--                                    <th>{{__('messages.name')}}</th>--}}
{{--                                    <th>{{__('messages.email')}}</th>--}}
{{--                                    <th>--}}
{{--                                        <!-- <a href="" class="btn btn-primary float-right"><i class="mdi mdi-all-inclusive"></i><span class="hide-menu"> Create New </span></a> -->--}}
{{--                                        @can('create_users')--}}
{{--                                            <button type="button" name='view' class="btn btn-primary float-righ"--}}
{{--                                                    id="create_new">--}}
{{--                                                <i class="fas fa-plus-square"></i>--}}
{{--                                                <span class="hide-menu"> {{__('messages.create_new')}} </span>--}}
{{--                                            </button>--}}
{{--                                        @endcan--}}
{{--                                    </th>--}}
{{--                                </tr>--}}
{{--                                </head>--}}
{{--                                <?php--}}
{{--                                $i = 1;--}}
{{--                                ?>--}}
{{--                                </thead>--}}
{{--                                <tbody>--}}
{{--                                @foreach($users as $user)--}}

{{--                                    <tr>--}}
{{--                                        <td><?= $i; ?></td>--}}
{{--                                        <td>{{$user->name}}--}}
{{--                                            <input type="hidden" name="" id="user_name{{$user->id}}"--}}
{{--                                                   value="{{$user->name}} ">--}}
{{--                                        </td>--}}

{{--                                        <td>{{$user->email}}</td>--}}
{{--                                        <td>--}}
{{--                                            @can('retrieve_users')--}}
{{--                                                <a href="{{Config::get('app.url').'user_update/'.$user->id}}"--}}
{{--                                                   class="btn btn-info"><i--}}
{{--                                                        class="fas fa-eye"></i> {{__('messages.view')}}</a>--}}
{{--                                            @endcan--}}
{{--                                            @can('retrieve_users')--}}
{{--                                                <button type="button" class="btn btn-info permission_view"--}}
{{--                                                        id="{{$user->id}}"><i--}}
{{--                                                        class="fas fa-edit"></i> {{__('messages.permission_view')}}--}}
{{--                                                </button>--}}
{{--                                            @endcan--}}
{{--                                            @can('update_users')--}}
{{--                                                <button type="button" class="btn btn-warning password_change"--}}
{{--                                                        id="{{$user->id}}"><i--}}
{{--                                                        class="fas fa-edit"></i> {{__('messages.change_password')}}--}}
{{--                                                </button>--}}
{{--                                            @endcan--}}
{{--                                            @can('delete_users')--}}
{{--                                                <button type="button" class="btn btn-danger user_delete"--}}
{{--                                                        id="{{$user->id}}">--}}
{{--                                                    <i class="fas fa-trash-alt"></i> {{__('messages.delete')}} </button>--}}
{{--                                            @endcan--}}
{{--                                        </td>--}}
{{--                                    </tr>--}}
{{--                                    <?php $i++ ?>--}}
{{--                                @endforeach--}}

{{--                                </tbody>--}}
{{--                            </table>--}}

{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <!-- End Default Light Table -->--}}

{{--        </div>--}}
{{--    @endcan--}}

{{--    <!-- Add new user Modal -->--}}
{{--    <div class="modal fade" id="new_user_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"--}}
{{--         aria-hidden="true">--}}
{{--        <div class="modal-dialog" role="document">--}}
{{--            <div class="modal-content">--}}
{{--                <div class="modal-header">--}}
{{--                    <h5 class="modal-title" id="exampleModalLabel">{{__('messages.add_user')}}</h5>--}}
{{--                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">--}}
{{--                        <span aria-hidden="true">&times;</span>--}}
{{--                    </button>--}}
{{--                </div>--}}

{{--                <div class="modal-body">--}}
{{--                    <div id="user_message"></div>--}}
{{--                    <form method="POST" id="user_create" class="">--}}
{{--                        @csrf--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="name" class="col-md-4 col-form-label">{{__('messages.name')}}</label>--}}

{{--                            <div class="col-md-8">--}}
{{--                                <input id="name" type="text" class="form-control" name="name" required autofocus--}}
{{--                                       placeholder="{{__('messages.name')}}">--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="email" class="col-md-4 col-form-label">{{__('messages.email')}}</label>--}}
{{--                            <div class="col-md-8">--}}
{{--                                <input id="email" type="email" class="form-control" name="email"--}}
{{--                                       placeholder="{{__('messages.email')}}" required>--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="password" class="col-md-4 col-form-label">{{__('messages.password')}}</label>--}}
{{--                            <div class="col-md-8">--}}
{{--                                <input id="password" type="password" class="form-control" name="password"--}}
{{--                                       placeholder="{{__('messages.password')}}" autocomplete="Password" required>--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="password-confirm"--}}
{{--                                   class="col-md-4 col-form-label">{{__('messages.user_list_confirm_password')}}</label>--}}
{{--                            <div class="col-md-8">--}}
{{--                                <input id="password-confirm" type="password" class="form-control"--}}
{{--                                       name="password_confirmation"--}}
{{--                                       placeholder="{{__('messages.user_list_confirm_password')}}"--}}
{{--                                       autocomplete="Confirm Password" required>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </form>--}}
{{--                </div>--}}
{{--                <div class="modal-footer">--}}
{{--                    <button type="button" class="btn btn-secondary"--}}
{{--                            data-dismiss="modal">{{__('messages.close')}}</button>--}}
{{--                    <button type="submit" class="btn btn-primary" id="new_user_save">{{__('messages.add')}}</button>--}}
{{--                </div>--}}

{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--    <!-- Add new user Modal End -->--}}

{{--    <!-- Password change Modal -->--}}
{{--    <div class="modal fade" id="change_password_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"--}}
{{--         aria-hidden="true">--}}
{{--        <div class="modal-dialog" role="document">--}}
{{--            <div class="modal-content">--}}
{{--                <div class="modal-header">--}}
{{--                    <h5 class="modal-title" id="exampleModalLabel">{{__('messages.change_password')}}</h5>--}}
{{--                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">--}}
{{--                        <span aria-hidden="true">&times;</span>--}}
{{--                    </button>--}}
{{--                </div>--}}

{{--                <div class="modal-body">--}}
{{--                    <div id="change_password_message"></div>--}}
{{--                    <form method="POST" id="change_password" class="">--}}
{{--                        @csrf--}}

{{--                        <input type="hidden" name="user_id" id="change_pass_user_id">--}}
{{--                        <div class="form-group row">--}}
{{--                            <label for="new_password"--}}
{{--                                   class="col-md-4 col-form-label">{{__('messages.new_password')}}</label>--}}

{{--                            <div class="col-md-8">--}}
{{--                                <input id="new_password" type="password" class="form-control" name="new_password"--}}
{{--                                       placeholder="{{__('messages.new_password')}}" autocomplete="New Password"--}}
{{--                                       required>--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="new_password_confirm"--}}
{{--                                   class="col-md-4 col-form-label">{{__('messages.confirm_password')}}</label>--}}

{{--                            <div class="col-md-8">--}}
{{--                                <input id="new_password_confirm" type="password" class="form-control"--}}
{{--                                       name="new_password_confirm" placeholder="{{__('messages.confirm_password')}}"--}}
{{--                                       autocomplete="Confirm Password" required>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </form>--}}
{{--                </div>--}}
{{--                <div class="modal-footer">--}}
{{--                    <button type="button" class="btn btn-secondary"--}}
{{--                            data-dismiss="modal">{{__('messages.close')}}</button>--}}
{{--                    <button type="submit" class="btn btn-primary"--}}
{{--                            id="change_password_save">{{__('messages.save')}}</button>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}

{{--    <!-- Password change Modal End -->--}}



@endsection
