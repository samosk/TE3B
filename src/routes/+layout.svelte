<script lang="ts">
	import { dataset_dev } from 'svelte/internal';
	import '../app.css';
	import { onMount } from 'svelte';
	// import { themeChange } from 'theme-change';
	// let audioFile: HTMLAudioElement;

	// function playAudio() {
	// 	audioFile.play();
	// }
	// onMount(() => {
	// 	// themeChange(false);
	// 	audioFile = new Audio('metalpipe.mp3');
	// });
</script>

<!-- <audio id="myAudio">
	<source src="metalpipe.mp3" type="audio/mpeg" />
</audio> -->
<!-- <h1 class="text-xl font-bold">Phrog</h1> -->
<!-- <button on:click={playAudio} data-toggle-theme="dark,winter" data-act-class="ACTIVECLASS"
	><h1 class="text-xl font-bold">Pipe.mp3</h1></button
> -->

<slot />
<!-- global html -->
