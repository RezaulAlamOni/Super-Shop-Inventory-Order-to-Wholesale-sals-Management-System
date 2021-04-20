@extends('backend.layouts.master')
@section('title')
<title>{{__('messages.assign_permission_to_user')}}</title>
@endsection

@section('content')
<div id="assign_permission_message">

</div>
<div class="main-content-container container-fluid px-4">
	<!-- Page Header -->
	<div class="page-header row no-gutters py-4">
		<div class="col-12 col-sm-4 text-center text-sm-left mb-0">
			<!-- <span class="text-uppercase page-subtitle">Overview</span> -->
			<h3 class="page-title">{{__('messages.assign_permission_to_user')}}</h3>
		</div>
	</div>
	@can('update_permissions')
	<div class="row">
		<div class="col-sm-12">
			<div class="card card-small mb-4">
				<div class="card-header border-bottom">
					<h6 class="m-0">{{ $title }}</h6>
				</div>
				<ul class="list-group list-group-flush">
					<li class="list-group-item p-3">
						<div class="row">
							<div class="col">
								<form method="post">
									<div class="form-group row">
										<label for="inputEmail3"
											class="col-sm-2 col-form-label">{{__('messages.user_name')}}</label>
										<div class="col-sm-4">
											<select class="custom-select custom-select-lg mb-3" name="user_id"
												id="user_id_for_permission">
												<option value=0 selected>{{__('messages.select_user')}}</option>
												@foreach($users as $user)
												<option value="{{$user->id}}">{{$user->name}}</option>
												@endforeach
											</select>
										</div>
									</div>
									{{-- TEST --}}
									<div class="row">
										<div class="col-md-2 col-lg-2"></div>

										<div class="col-md-4 col-lg-4">
											<div class="select-permission-wrapper my-4">
												<h3>{{__('messages.select_permission')}}</h3>
												<div id="permissions">
													{{__('messages.role_no_select')}}
												</div>
												<div id="save_button">
													<button type="submit" id="save_permission" class="btn btn-primary"><i class="fas fa-save"></i> {{__('messages.save')}}</button>
												</div>
												
											</div>
										</div>

										<div class="col-md-5 col-lg-5">
											<div class="select-permission-wrapper my-4">
												<h3>{{__('messages.previous_permission')}}</h3>
												<div id="previus_permissions">
													{{__('messages.role_no_select')}}
												</div>
											</div>
										</div>

									</div>
									{{-- TEST --}}

								</form>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	@endcan
</div>

@endsection