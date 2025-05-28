<script module>
	import { writable } from 'svelte/store';

	export const metadata = writable([]);
	export const photoCallbacks = writable([]);
	export const selectedPhoto = writable(null);
	export const enterFullscreen = writable(( _ ) => null)
</script>