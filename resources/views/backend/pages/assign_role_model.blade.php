@extends('backend.layouts.master')
@section('title')
<title>{{__('messages.role_permission_menu')}}</title>
@endsection

@section('content')
<div id="assign_role_message">

</div>
<div class="main-content-container container-fluid px-4">
	<!-- Page Header -->
	<div class="page-header row no-gutters py-4">
		<div class="col-12 col-sm-4 text-center text-sm-left mb-0">
			<!-- <span class="text-uppercase page-subtitle">Overview</span> -->
			<h3 class="page-title">{{__('messages.role_permission_menu')}}</h3>
		</div>
	</div>
	@can('update_roles')
	<div class="row">
		<div class="col-sm-12">
			<div class="card card-small mb-4">
				<div class="card-header border-bottom">
					<h6 class="m-0">{{ $title1 }}</h6>
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
												id="user_id_for_role">
												<option value=0>{{__('messages.select_user')}}</option>
												@foreach($users as $user)
												<option value="{{$user->id}}">{{$user->name}}</option>
												@endforeach
											</select>
										</div>
									</div>
									<div class="form-group row">
										<label for="inputEmail3"
											class="col-sm-2 col-form-label">{{__('messages.select_role')}}</label>
										<div class="col-sm-4" id="role">
											{{__('messages.user_no_select')}}
										</div>
									</div>
									<div class="form-group row">
										<label for="inputEmail3" class="col-sm-2 col-form-label"></label>
										<div class="col-sm-4">
											<button type="submit" id="user_click" class="btn btn-primary"> <i
													class="fas fa-save"></i> {{__('messages.save')}}</button>
										</div>
									</div>

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