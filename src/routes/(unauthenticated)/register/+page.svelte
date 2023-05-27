<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form use:enhance method="POST" action="?/register">
	<div class="flex items-center justify-center h-screen">
		<div
			class="flex items-center justify-center h-96 card w-96 bg-base-100 shadow-xl flex-col space-y-4"
		>
			<div class="flex flex-col space-y-4">
				<h1 class="flex items-center justify-center card-title text-3xl font-bold">REGISTER</h1>
				<div class="form-control flex-col space-y-4">
					<span><h3 class="text-2xl">Username</h3></span>
					<input type="text" placeholder="Username" class="input input-bordered" name="username" />
					<span><h3 class="text-2xl">Password</h3></span>
					<input type="text" placeholder="Password" class="input input-bordered" name="password" />
				</div>
				<button class="btn btn-outline">REGISTER</button>
				<div class="flex items-center justify-center card shadow-xl bg-black">
					<p class="text-white">
						Already have a user? <a href="./login">LOGIN</a>
					</p>
				</div>
			</div>
		</div>
	</div>
	{#if form?.error}
		{form?.error}
	{/if}
</form>
