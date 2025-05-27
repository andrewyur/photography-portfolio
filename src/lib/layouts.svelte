<script module>
    import PhotoCard from './PhotoCard.svelte';

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

	const layouts = {
        1: () => one,
		2: () => two,
		3: () => random([three1, three2, three3]),
		5: () => random([five1, five2]),
		12: () => random([twelve1, twelve2, twelve3])
	};

    export function getLayoutSnippet(num) {
        return layouts[num]()
	}
</script>

{#snippet one([a])} 
    <div class="one">
        <PhotoCard {...a} />
    </div>
{/snippet}

{#snippet two([a, b])}
    <div class="grid-2">
        <PhotoCard {...a}/>
        <PhotoCard {...b}/>
    </div>
{/snippet}

{#snippet three1([a,b,c])}
    <div class="grid-3a">
        <PhotoCard {...a} --g-cols="1 / 2" --g-rows="1 / 2"/>
        <PhotoCard {...b} --g-cols="1 / 2" --g-rows="2 / 3"/>
        <PhotoCard {...c} --g-cols="2 / 4" --g-rows="1 / 3"/>
    </div>
{/snippet}

{#snippet three2([a,b,c])}
    <div class="grid-3a">
        <PhotoCard {...a} --g-cols="1 / 3" --g-rows="1 / 3"/>
        <PhotoCard {...b} --g-cols="3 / 4" --g-rows="1 / 2"/>
        <PhotoCard {...c} --g-cols="3 / 4" --g-rows="2 / 3"/>
    </div>
{/snippet}

{#snippet three3([a, b, c])}
    <div class="grid-3b">
        <PhotoCard {...a}/>
        <PhotoCard {...b}/>
        <PhotoCard {...c}/>
    </div>
{/snippet}

{#snippet five1(arr)}
    {@render two(arr.slice(0, 2))}
    {@render (random([three1, three2, three3]))(arr.slice(2, 5))}
{/snippet}

{#snippet five2(arr)}
    {@render (random([three1, three2, three3]))(arr.slice(0, 3))}
    {@render two(arr.slice(3, 5))}
{/snippet}

{#snippet twelve1(arr)}
    {@render three1(arr.slice(0, 3))}
    {@render three3(arr.slice(3, 6))}
    {@render three2(arr.slice(6, 9))}
    {@render three1(arr.slice(9, 12))}
{/snippet}

{#snippet twelve2(arr)}
    {@render three2(arr.slice(0, 3))}
    {@render three1(arr.slice(3, 6))}
    {@render three3(arr.slice(6, 9))}
    {@render three1(arr.slice(9, 12))}
{/snippet}

{#snippet twelve3(arr)}
    {@render two(arr.slice(0, 2))}
    {@render three1(arr.slice(2, 5))}
    {@render two(arr.slice(5, 7))}
    {@render three2(arr.slice(7, 10))}
    {@render two(arr.slice(10, 12))}
{/snippet}

<style>
    .one {
        width: 75%;
        margin: auto;
    }

    .grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		aspect-ratio: 2 / 1;
		gap: 5px;
	}

	.grid-3a {
        display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5px;
		aspect-ratio: 3 / 2;
	}

	.grid-3b {
        display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5px;
		aspect-ratio: 3 / 1;
	}
</style>