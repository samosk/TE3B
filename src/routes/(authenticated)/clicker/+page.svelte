<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	// const herb = _users;

	$: clicks = data.clicks;
</script>

<!-- <div class="flex justify-center">
	<h2 class="text-2xl">Clicks: {clicks}</h2>
</div> -->

<div class="flex items-center justify-end">
	<div class="flex items-center card w-96 shadow-xl space-y-4 mx-8">
		<div class="flex flex-col py-8 space-y-8">
			<div class="form-control flex-col space-y-8">
				<h1 class="flex items-center justify-center card-title text-3xl font-bold">Leaderboard</h1>
				<h3 class="text-xl">Clicks:{data.clicks}</h3>
			</div>
		</div>
	</div>
</div>
<div class="flex items-center justify-center">
	<div class="flex items-center card w-96 shadow-2xl space-y-4">
		<div class="flex flex-col py-8 space-y-8">
			<div class="form-control flex-col space-y-8">
				<div class="flex items-center justify-center">
					<form use:enhance method="post" action="?/click">
						<button type="submit" class="btn btn-circle btn-noanimation" />
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- <svelte:head>
	<title>{clicks}</title>
</svelte:head> -->
