<script>
    // send photo metadata to photoloader when close to being rendered
    // handle thumbnail & full res loading

    const {height, width, photoGuid, derivatives } = $props()

    const aspectRatio = width / height

    const percent = 70 + Math.ceil(Math.random() * 30)
    const dimension = height > width ? "height" : "width"

</script>

<div class="photoCard"
    style="{dimension}: {percent}%"
    style:aspect-ratio={aspectRatio}
></div>

<style>
    .photoCard {
        background-color: aquamarine;
        margin: auto;
        grid-column: var(--g-cols);
        grid-row: var(--g-rows);
    }
</style>