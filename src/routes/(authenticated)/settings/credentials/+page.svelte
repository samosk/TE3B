<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';
	export let form: ActionData;
</script>

<form use:enhance method="POST" action="?/credentials">
	<div class="flex items-center justify-center h-screen">
		<div class="flex items-center card w-96 shadow-xl space-y-4">
			<div class="flex flex-col py-8 space-y-8">
				<h1 class="flex items-center justify-center card-title text-3xl font-bold">
					Change credentials
				</h1>
				<div class="form-control flex-col space-y-8">
					<span><h3 class="text-2xl">Username</h3></span>
					<input type="text" placeholder="Username" class="input input-bordered" name="username" />
					{#if form?.username}
						<p>{form?.username}</p>
					{/if}
					<span><h3 class="text-2xl">Password</h3></span>
					<input
						type="password"
						placeholder="Password"
						class="input input-bordered"
						name="password"
					/>
					{#if form?.password}
						<p>{form?.password}</p>
					{/if}
					<input
						type="password"
						placeholder="New Password"
						class="input input-bordered"
						name="newpassword"
					/>
				</div>
				<div class="flex justify-center space-y-8">
					<button class="btn btn-outline">SAVE</button>
				</div>
			</div>
		</div>
	</div>
	{#if form?.server}
		<p>{form?.server}</p>
	{/if}
</form>
