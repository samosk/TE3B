<script lang="ts">
	import type { LayoutServerData } from '../$types';
	export let data: LayoutServerData | any;
</script>

<nav>
	<div class="navbar shadow-xl">
		<a class="btn btn-ghost normal-case text-xl" href="/">Home</a>
		<a class="btn btn-ghost normal-case text-xl" href="/settings">Settings</a>
		<a class="btn btn-ghost normal-case text-xl" href="/chat">Chat</a>
		<a class="btn btn-ghost normal-case text-xl" href="/clicker">Clicker</a>
		<a class="btn btn-ghost normal-case text-xl" href="/store">Store</a>
	</div>
</nav>

<div class="basis-8 flex justify-center p-5">
	<p class="text-lg font-semibold">Welcome: {data.name}</p>
</div>

<slot />
