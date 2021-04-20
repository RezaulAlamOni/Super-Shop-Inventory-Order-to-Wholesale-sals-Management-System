@extends('backend.layouts.master')
@section('title')
<title>{{__('messages.manage_role')}}</title>
@endsection
@section('content')
@include('backend.flash_message.flash_message')
<div id="role_main_message"></div>
<div class="main-content-container container-fluid px-4">
	<!-- Page Header -->
	<div class="page-header row no-gutters py-4">
		<div class="col-12 col-sm-4 text-center text-sm-left mb-0">
			<!-- <span class="text-uppercase page-subtitle">Overview</span> -->
			<h3 class="page-title">{{__('messages.role_management')}}</h3>
		</div>
	</div>

	<!-- End Page Header -->
	<!-- Default Light Table -->
	<div class="row">
		@can('create_roles')
		<div class="col-lg-4">

			<div class="card card-small mb-4">
				<div class="card-header border-bottom">
					<h6 class="m-0">{{ $title }}</h6>
				</div>
				<ul class="list-group list-group-flush">
					<li class="list-group-item p-3">
						<div class="row">
							<div class="col">
								<form action="{{Config::get('app.url').'role_insert'}}" method="post">
									@csrf
									<input type="hidden" name="role_update_id"
										value="<?= !empty($role_update_info)? $role_update_info['role_id']:'' ?>">
									<div class="form-row">
										<div class="form-group col-md-12">
											<label for="role">{{__('messages.role_name')}}</label>
											<input type="text" name="role" class="form-control" id="role"
												placeholder="{{ __('messages.please_role_name') }}"
												value="<?= !empty($role_update_info)? $role_update_info['role_name']:'' ?>"
												required>
										</div>
									</div>
									<div class="form-row">
										<div class="form-group col-md-12">
											<label for="permissions">{{__('messages.permission_name')}}</label>
											<select class="js-example-basic-multiple form-control" name="permissions[]"
												id="permissions" multiple="multiple">
												@foreach ($all_permissions as $all_permission)
												<option value="{{$all_permission->id}}" @if(!empty($role_update_info))
													@if(!empty($role_update_info['roles_has_permission'])) @foreach($role_update_info['roles_has_permission'] as $roles_has_permission)
													@if($all_permission->id==$roles_has_permission->permission_id)
													selected @endif @endforeach @endif @endif>{{$all_permission->name}}
												</option>
												@endforeach
											</select>
										</div>
									</div>

									<div class="form-row">
										<div class="form-group col-md-12">
											<label for="role_description">{{__('messages.desc')}}</label>
											<textarea class="form-control" id="role_description" name="role_description"
												placeholder="{{__('messages.role_desc')}}"
												rows="5"><?= !empty($role_update_info)? $role_update_info['role_description']:'' ?></textarea>
										</div>
									</div>
									<button type="submit" class="btn btn-primary"><i class="fas fa-save">

										</i>
										{{ !empty($role_update_info)? __('messages.update'):__('messages.add') }}</button>
								</form>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- Create role end -->
		@endcan
		<!-- Role view -->
		@can('retrieve_roles')
		<div class="col" id="role_list">
			<div class="card card-small mb-8">
				<div class="card-header border-bottom">
					<h6 class="m-0">{{__('messages.role_list')}}</h6>
				</div>
				<div class="card-body p-0 pb-3">
					<table class="table mb-0">
						<thead class="bg-light">
							<tr>
								<th>{{__('messages.role_id')}}</th>
								<th>{{__('messages.role_name')}}</th>
								<th>{{__('messages.role_permission')}}</th>
								<th>{{__('messages.role_action')}}</th>
							</tr>
							</head>
							<?php
							$i = 1;
							?>
						<tbody>

							@foreach($role_permissions as $role)
							<tr>
								<td><?= $i; ?></td>
								<td>{{ $role['role_name'] }}
								<input type="hidden" name="" id="role_name{{$role['role_id']}}" value="{{ $role['role_name'] }}">
								</td>
								<td style="max-width:300px;">
									{!! $role['role_permissions'] !!}
									{{-- @foreach($role['role_permissions'] as $permission)
									<a href="#">{{ $permission->name }} |</a>
									@endforeach --}}
								</td>
								<td>
									<a class="btn btn-info"
										href="{{Config::get('app.url').'role/'.$role['role_id']}}"><i
											class="fas fa-edit"></i></a>
									<!-- Delete role -->
									@can('delete_roles')
									@if($role['is_system']==0)


									<button type="button" class="btn btn-danger role_delete"
										id="{{$role['role_id']}}"><i
											class="fas fa-trash-alt"></i>{{__('messages.delete')}} </button>



									@endif
									<!-- Delete role end -->
									@endcan
								</td>



							</tr>
							<?php $i++ ?>
							@endforeach
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- Role view end -->
	@endcan
	<!-- End Default Light Table -->

</div>
@endsection