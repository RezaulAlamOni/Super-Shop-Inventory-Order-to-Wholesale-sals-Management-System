@extends('backend.layouts.master')
@section('title')
<title>{{__('messages.user_update')}}</title>
@endsection

@section('content')

@include('backend.flash_message.flash_message')
<div id="user_update_message"></div>
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
        <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
            <span class="text-uppercase page-subtitle">{{__('messages.overview')}}</span>
            <h3 class="page-title">{{__('messages.user_profile')}}</h3>
        </div>
    </div>
    <!-- End Page Header -->

    <!-- Default Light Table -->
    @foreach($users as $user)
    <div class="row" id="div">
        <div class="col-lg-4">
            <div class="card card-small mb-4 pt-3">
                <div class="card-header border-bottom text-center">
                    <div class="mb-3 mx-auto" id="image_id">
                        <img class="rounded-circle"
                            src="{{Config::get('app.url').'storage/app/public/backend/images/users/'.$user->image}}"
                            alt="{{__('messages.image_set')}}" width="110">
                    </div>
                    <h4 class="mb-0" id="name_id">{{$user->name}}</h4>
                    <span class="text-muted d-block mb-2" id="email_id">{{$user->email}}</span>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item px-4">
                        <div class="progress-wrapper">
                            <!-- <strong class="text-muted d-block mb-2">Workload</strong> -->
                            <div class="px-4">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card card-small mb-4">
                <div class="card-header border-bottom">
                    <h6 class="m-0">{{__('messages.profile_details')}}</h6>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item p-3">
                        <div class="row" id="div">
                            <div class="col">
                                <form method="POST" id="update_user" class="" enctype="multipart/form-data">
                                    @csrf

                                    <input type="hidden" name="id" value="{{ $user->id }}">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="f_name">{{__('messages.name')}}</label>
                                            <input id="f_name" type="text" class="form-control" name="f_name" autofocus
                                                placeholder="{{__('messages.name')}}" value="{{ $user->first_name }}">
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="l_name">{{__('messages.last_name')}}</label>
                                            <input id="l_name" type="text" class="form-control" name="l_name"
                                                placeholder="{{__('messages.last_name')}}"
                                                value="{{ $user->last_name }}">
                                            <!-- <input type="text" class="form-control" id="feLastName" placeholder="Last Name" value="Brooks"> -->
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="full_name">{{__('messages.full_name')}}</label>
                                            <input id="full_name" type="text" class="form-control" name="full_name"
                                                value="{{ $user->name }}" placeholder="{{__('messages.name')}}">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="update_email">{{__('messages.email')}}</label>
                                            <input id="update_email" type="text" class="form-control" name="email"
                                                value="{{ $user->email }}" placeholder="{{__('messages.email')}}">
                                        </div>

                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="update_phone">{{__('messages.phone_number')}}</label>
                                            <input id="update_phone" type="number" class="form-control" name="phone"
                                                placeholder="{{__('messages.phone_number')}}"
                                                value="{{ $user->phone }}">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="dob">{{__('messages.date_birth')}}</label>
                                            <input id="dob" type="date" class="form-control" name="dob"
                                                value="{{ $user->date_of_birth }}">
                                        </div>

                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="image">{{__('messages.profile_picture')}}</label>

                                            <input id="image" type="file" class="form-control" name="image">

                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="gender">{{__('messages.gender')}}</label>
                                            <select name="gender" id="gender" class="form-control">
                                                <option value="">{{__('messages.choose')}}</option>
                                                <option value="m" <?php if($user->gender=="m"){echo "selected";} ?>>
                                                    {{__('messages.male')}}
                                                </option>
                                                <option value="f" <?php if($user->gender=="f"){echo "selected";} ?>>
                                                    {{__('messages.female')}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-2">
                                            <label for="update_postal_code">{{__('messages.zip')}}</label>
                                            <input id="update_postal_code" type="text" class="form-control" name="postal_code"
                                                placeholder="{{__('messages.postal_code')}}"
                                                value="{{ $user->postal_code }}">
                                        </div>
                                    </div>
                                    <input id="update" type="submit" class="btn btn-accent"
                                        value="{{__('messages.update')}}">

                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    @endforeach
    <!-- End Default Light Table -->
</div>



@endsection