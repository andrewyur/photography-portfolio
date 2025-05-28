<script>
    import { getContext } from "svelte";
    import { metadata, photoCallbacks, selectedPhoto, enterFullscreen} from "./appStores.svelte";
    import { loadDerivativeUrls } from "./PhotoLoader.svelte";

    // send photo metadata to photoloader when close to being rendered
    // handle thumbnail & full res loading

    const { index } = $props();
    let photoCardNode;

    const {height, width, photoGuid, derivatives } = $metadata[index]

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

    const scrollableRef = getContext("scrollableRef")()
    function scrollToLocation() {
        const rect = photoCardNode.getBoundingClientRect()
        const absolutePosition = rect.top + scrollableRef.scrollTop + photoCardNode.offsetHeight / 2
        scrollableRef.scrollTo({top: absolutePosition - window.innerHeight / 2, behavior: 'smooth'})
    }

    const selectPhoto = () => {
        if(highResUrl) {
            $selectedPhoto = index
            $enterFullscreen(highResUrl)
            scrollToLocation()
        }
    }

    $photoCallbacks[index] = selectPhoto

    loadPhotos()
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="photoCard"
    style="{dimension}: {percent}%"
    style:aspect-ratio={aspectRatio}
    onclick={selectPhoto}
    bind:this={photoCardNode}
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