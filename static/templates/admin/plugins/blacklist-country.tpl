<form role="form" class="blacklist-country-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				Enter the list of blacklisted countries in the input below. Remember to use the
				<a href="https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes"><strong>two-letter</strong> ISO_3166-1 country codes</a>,
				and case does not matter, both lowercase and uppercase values are accepted and treated as the same.
			</p>
			<input type="text" id="blacklist" name="blacklist" value="{blacklist}" title="Blacklist" data-field-type="tagsinput">
			<p class="help-block">
				e.g. "KR" for Korea, "CA" for Canada, etc.
			</p>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>