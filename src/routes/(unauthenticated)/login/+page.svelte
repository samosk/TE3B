<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	export let form: ActionData;
</script>

<form use:enhance method="POST" action="?/login">
	<div class="flex items-center justify-center h-screen">
		<div class="flex items-center justify-center h-96 card w-96 shadow-xl">
			<div class="flex flex-col space-y-4">
				<h1 class="flex items-center justify-center card-title text-3xl font-bold">LOGIN</h1>
				<div class="form-control flex-col space-y-4">
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
				</div>
				<button class="btn btn-outline">LOGIN</button>
				<div class="flex items-center justify-center card shadow-xl bg-black">
					<p class="text-white">
						Don't have a user? <a href="./register">REGISTER</a>
					</p>
				</div>
			</div>
		</div>
	</div>
	{#if form?.server}
		<p>{form?.server}</p>
	{/if}
</form>
