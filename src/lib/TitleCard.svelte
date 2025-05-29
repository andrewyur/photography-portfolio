<script>
    let mobile = $state(window.innerHeight > window.innerWidth);
    window.addEventListener("resize", () => {
        mobile = window.innerHeight > window.innerWidth;
    })
</script>

<div>
    <!-- svelte-ignore a11y_missing_attribute -->
    <img src="/IMG_2507.webp" style:width="{mobile ? 80 : 60}%">
    <h1>ANDREW PHOTOGRAPHY</h1>
    <p>I shoot mostly with a Canon Rebel T4i, and ocasionally with my digicam or phone camera. I am not really sure how to classify the type of photos I take, but nearly all of the photos on here are ones I take on walks around my current place of residence. These are all from my shared album on apple photos, learn more about this website <a href="https://github.com/andrewyur/photography-portfolio">here</a>.</p>
</div>

<style>
    img {
        width: 60%;
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

    div {
        max-width: 1000px;
        margin: 15vh auto;
        /* display: flex;
        flex-direction: column;
        gap: 50px; */
        /* justify-content: space-around; */
    }
</style>