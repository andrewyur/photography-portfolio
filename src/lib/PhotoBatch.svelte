<script>
    import { getLayoutSnippet } from "./layouts.svelte"
    import { findLayoutDivision } from "./LayoutFinder.svelte";

    // determine best layout for given photos
    // display batch time/date
    // pass individual photo metadata and size into PhotoCard component 

    const { photosMetadata } = $props()

    // fisher-yates shuffle, in place
    function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
    }

    // helper function for date conversion
    function convertUTCDate (dateTimeString) {
        try {
            const [datePart, timePart] = dateTimeString.split("T");
            if (!datePart || !timePart) return null;
    
            const [year, month, day] = datePart.split("-").map(Number);
            const [hour, minute, second] = timePart.slice(0, -1).split(":").map(Number);    
    
            return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
        } catch {
            return null
        }
    }

    function computeLayoutSlices(metadata) {
        let divisions = findLayoutDivision(metadata.length)
        shuffle(divisions)

        let index = 0;
        return divisions.map((val) => {
            let slice = { start: index, end: index + val, val }
            index += val
            return slice
        })
    }

    const layoutSlices = $derived(computeLayoutSlices(photosMetadata))
    const batchDate = $derived(convertUTCDate(photosMetadata[0]?.batchDateCreated))
</script>

<div class="photoContainer">
	{#if batchDate}
		<p>{batchDate.toLocaleString()}</p>
	{/if}

    {#each layoutSlices as layout, i} 
        {@render (getLayoutSnippet(layout.val))(photosMetadata.slice(layout.start, layout.end))}
    {/each}
</div>

<style>
    .photoContainer {
        min-height: 300px;
        width: 100%;
        box-sizing: border-box;
        background-color: red;
        max-width: 1000px;
        margin: auto;
        margin-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

</style>