<script>
    let mobile = $state(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', () => {
        mobile = window.innerHeight > window.innerWidth;
    });

    let visible = $state(false);
    function onLoad() {
        visible = true;
    }
</script>

<div id="container" class:loaded={visible}>
    <!-- svelte-ignore a11y_missing_attribute -->
    <img
        src="/IMG_2507.webp"
        onload={onLoad}
        style:width="{mobile ? 80 : 60}%"
    />
    <div id="title-photo"></div>
    <h1>ANDREW PHOTOGRAPHY</h1>
    <p>
        I shoot mostly with a Canon Rebel T4i, and ocasionally with my digicam
        or phone camera. I am not really sure how to classify the type of photos
        I take, but nearly all of the photos on here are ones I take on walks
        around my current place of residence. These are all from my shared album
        on apple photos, learn more about this website <a
            href="https://github.com/andrewyur/photography-portfolio">here</a
        >.
    </p>
</div>

<style>
    img {
        width: 100%;
        margin-left: auto;
        margin-right: 0%;
        display: block;
    }

    h1 {
        margin-top: 90px;
        margin-bottom: 40px;
        padding: 0;
    }

    p {
        margin: 0;
        padding: 0;
        max-width: 500px;
    }

    #container {
        max-width: 1000px;
        margin: 15vh auto;
        transition: opacity 0.2s ease;
        opacity: 0;
        /* display: flex;
        flex-direction: column;
        gap: 50px; */
        /* justify-content: space-around; */
    }

    .loaded {
        opacity: 1 !important;
    }
</style>
