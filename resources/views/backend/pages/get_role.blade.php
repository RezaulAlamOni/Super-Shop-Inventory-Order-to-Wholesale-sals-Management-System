<div class="row">
	<div class="col-sm-12">
		<div class="form-group">

			<div class="col-md-12">
				@foreach($roles as $role)
				<div class="radio">
					<label class="radio-inline">
						<input type="checkbox" value="{{$role->id}}" id="role" name="role[]" <?php if (in_array($role->id, $datas)) {
									echo "checked ";
									}
						?>>{{$role->name}}


					</label>
				</div>
				@endforeach
			</div>
		</div>
	</div>
</div>