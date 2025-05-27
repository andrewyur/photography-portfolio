<script>
    import { loadDerivativeUrls } from "./PhotoLoader.svelte";

    // send photo metadata to photoloader when close to being rendered
    // handle thumbnail & full res loading

    const {height, width, photoGuid, derivatives } = $props()

    const aspectRatio = width / height

    const percent = 70 + Math.ceil(Math.random() * 30)
    const dimension = height > width ? "height" : "width"

    let lowResUrl = $state()
    let highResUrl = $state()

    async function loadPhotos() {
        const checksums = Object.values(derivatives).map((v) => v.checksum)

        const derivativeUrls = await loadDerivativeUrls(photoGuid, checksums)

        const minRes = Math.min(...Object.keys(derivatives).map((v) => parseInt(v)))
        const maxRes = Math.max(...Object.keys(derivatives).map((v) => parseInt(v)))

        lowResUrl = derivativeUrls[derivatives[minRes].checksum]
        highResUrl = derivativeUrls[derivatives[maxRes].checksum]
    }

    function onHighResLoad(event) {
        event.target.classList.add("loaded")
    }

    loadPhotos()
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<div class="photoCard"
    style="{dimension}: {percent}%"
    style:aspect-ratio={aspectRatio}
>
    <img class="lowRes" src={lowResUrl}/>
    <img class="highRes" src={highResUrl} onload={onHighResLoad} class:loaded={false}/>
</div>

<style>
    .photoCard {
        position: relative;
        background-color: aquamarine;
        margin: auto;
        grid-column: var(--g-cols);
        grid-row: var(--g-rows);
    }

    .lowRes, .highRes {
        transition: opacity 0.1s ease;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .highRes {
        opacity: 0;
    }

    .highRes.loaded {
        opacity: 1;
    }
</style>