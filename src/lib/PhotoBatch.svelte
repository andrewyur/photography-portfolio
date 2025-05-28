<script>
    import { getLayoutSnippet } from "./layouts.svelte"
    import { findLayoutDivision } from "./layoutFinder";
    import { metadata } from "./appStores.svelte";

    // determine best layout for given photos
    // display batch time/date
    // pass individual photo metadata and size into PhotoCard component 

    const { batchStart, batchEnd } = $props()

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

    function computeLayoutSlices(batchLength) {
        if($metadata.length == 0) return []

        let divisions = findLayoutDivision(batchLength)
        shuffle(divisions)

        let index = batchStart;
        return divisions.map((val) => {
            let slice = { start: index, end: index + val, val }
            index += val
            return slice
        })
    }

    let layoutSlices = $derived(computeLayoutSlices(batchEnd - batchStart))
    let batchDate = $derived(convertUTCDate($metadata?.at(batchStart)?.batchDateCreated))
    
    const range = (start, stop) => [...Array(stop - start).keys().map((v) => v + start)]
</script>

<div class="photoContainer">
	{#if batchDate}
		<p>{batchDate.toLocaleString()}</p>
	{/if}

    {#each layoutSlices as layout} 
        {@render (getLayoutSnippet(layout.val))(range(layout.start, layout.end))}
    {/each}
</div>

<style>
    .photoContainer {
        min-height: 300px;
        width: 100%;
        box-sizing: border-box;
        /* background-color: red; */
        margin: auto;
        margin-bottom: 10px;
        max-width: 1000px;
    }

    p {
        /* font-size: x-large; */
        font-style: italic;
        margin-bottom: 0 ;
    }
</style>