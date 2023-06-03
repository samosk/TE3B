<script lang="ts">
	import type { ActionData } from './$types';

	// import type { ActionData } from '../../$types';
	// import type {ActionData} from ";

	export let form: ActionData;
</script>

<!-- <button class="btn btn-outline"><a href="./settings/credentials">Change Credentials</a></button> -->
<a role="button" class="btn btn-outline" href="./settings/credentials">Change Credentials</a>

<form method="POST" action="?/logout">
	<button class="btn btn-outline">LOGOUT</button>
</form>

<form method="POST" action="?/deleteaccount">
	<button class="btn btn-outline">DELETE ACCOUNT</button>
	{#if form?.delete}
		{form?.delete}
	{/if}
</form>
