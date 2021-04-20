@extends('backend.layouts.master')
@section('title')
<title>{{__('messages.manage_permission')}}</title>
@endsection

@section('content')
@if(Session::get('delete_message'))
<div class="alert {{Session::get('class_name')}} alert-dismissible fade show mb-0" role="alert">
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">×</span>
	</button>
	<i class="fa fa-check mx-2"></i>
	{{ Session::get('delete_message') }}
</div>
@endif
@include('backend.flash_message.flash_message')
<div id="permission_main_message"></div>
<div class="main-content-container container-fluid px-4">
	<!-- Page Header -->
	<div class="page-header row no-gutters py-4">
		<div class="col-12 col-sm-4 text-center text-sm-left mb-0">
			<!-- <span class="text-uppercase page-subtitle">Overview</span> -->
			<h3 class="page-title">{{__('messages.permission_management')}}</h3>
		</div>
	</div>
	<div class="row" id="div">
		@can('create_permissions')
		<div class="col-lg-4 col-md-12 col-sm-12">
			<div class="card card-small mb-4">
				<div class="card-header border-bottom">
					<h6 class="m-0">{{ $title }}</h6>
				</div>
				<ul class="list-group list-group-flush">
					<li class="list-group-item p-3">
						<div class="row">
							<div class="col">
								<form action="{{Config::get('app.url').'permission_insert'}}" method="post">
									@csrf
									<input type="hidden" name="permission_update_id"
										value="<?= !empty($permission_update_info)? $permission_update_info['id']:'' ?>">
									<div class="form-row">
										<div class="form-group col-md-12">
											<label for="permission_name">{{__('messages.permission_name')}}</label>
											<input type="text" name="permission" class="form-control"
												id="permission_name"
												placeholder="{{__('messages.please_permission_name')}}"
												value="<?= !empty($permission_update_info)? $permission_update_info['name']:'' ?>">
										</div>
									</div>
									<div class="form-row">
										<div class="form-group col-md-12">
											<label for="permission_descr">{{__('messages.permission_desc')}}</label>
											<textarea id="permission_descr" class="form-control" name="permission_descr"
												placeholder="{{__('messages.permission_desc')}}"
												rows="5"><?= !empty($permission_update_info)? $permission_update_info['permission_description']:'' ?></textarea>
										</div>
									</div>
									<button type="submit" class="btn btn-primary"></i>
										<?= !empty($permission_update_info)? __('messages.update'):__('messages.add') ?>
									</button>
								</form>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- Create permission end -->
		@endcan

		@can('retrieve_permissions')
		<div class="col-lg-8 col-md-12 col-sm-12" id="permission_list">
			<div class="card card-small mb-4">
				<div class="card-header border-bottom">
					<h6 class="m-0">{{ __('messages.permission_list')}}</h6>
				</div>
				<div class="card-body p-0 pb-3">
					<table class="table mb-0">
						<thead class="bg-light">
							<tr>
								<th>#</th>
								<th>{{ __('messages.permission_name')}}</th>
								<th colspan="2">{{ __('messages.permission_action')}}</th>
							</tr>
						</thead>
						<tbody>
							<?php $sl=1;?>
							@foreach($permissions as $permission)
							<tr>
								<td>{{$sl}}</td>
								<td>{{$permission->name}}
								<input type="hidden" name="" id="permission_name{{$permission->id}}" value="{{$permission->name}}">
							</td>
								<td>
									@if($permission->is_system==0)
									<a class="btn btn-info"
										href="{{Config::get('app.url').'permission/'.$permission->id}}"><i
											class="fas fa-edit"></i></a>
									@endif
								</td>
								<td>

									<!-- Delete permission -->
									@can('delete_permissions')
									@if($permission->is_system==0)
									<button type="button" class="btn btn-danger permission_delete"
										id="{{$permission->id}}"><i
											class="fas fa-trash-alt"></i>{{__('messages.delete')}} </button>
									@endif
									@endcan
								</td>
							</tr>
							<?php $sl++;?>
							@endforeach
						</tbody>

					</table>
				</div>

			</div>
		</div>
		@endcan
	</div>

</div>



@endsection