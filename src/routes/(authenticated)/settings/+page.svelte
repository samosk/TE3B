<script lang="ts">
	import type { ActionData } from './$types';

	// import type { ActionData } from '../../$types';
	// import type {ActionData} from ";

	export let form: ActionData;
</script>

<!-- <button class="btn btn-outline"><a href="./settings/credentials">Change Credentials</a></button> -->
<div class="flex items-center justify-center">
	<div class="flex items-center justify-center">
		<div class="flex flex-col space-y-4 items-center">
			<a role="button" class="btn btn-outline" href="./settings/credentials">Change Credentials</a>
			<form method="POST" action="?/logout">
				<button class="btn btn-outline">LOGOUT</button>
			</form>
			<form method="POST" action="?/deleteaccount">
				<button class="btn btn-error">DELETE ACCOUNT</button>
				{#if form?.delete}
					{form?.delete}
				{/if}
			</form>
		</div>
	</div>
</div>
