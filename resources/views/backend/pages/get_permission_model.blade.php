@if($not_matches==[])
No permission left to give this User
@endif

@foreach($not_matches as $not_match)
<div class="checkbox">
  <label>
    <input type="checkbox" name="permission[]" id="permission" value="{{$not_match->id}}" <?php if (in_array($not_match->id, $permissions_exist_id)) {
			echo "checked";} ?>>
    {{$not_match->name}}
  </label>
</div>

@endforeach