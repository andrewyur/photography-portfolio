<script>
  import { selectedPhoto, photoCallbacks, enterFullscreen, metadata } from "./appStores.svelte";

  let fullscreenNode, imageNode = $state();

  let mobile = $state(window.innerHeight > window.innerWidth);
  window.addEventListener("resize", () => {
    mobile = window.innerHeight > window.innerWidth;
  })

  function enterFullscreenFn(url) {
    fullscreenNode.classList.add("focused")
    imageNode.src = url
  }

  function exitFullscreen() {
    fullscreenNode.classList.remove("focused")
    imageNode.src = ""
    $selectedPhoto = null
  }

  function nextPhoto() {
    if ($selectedPhoto + 1 < $metadata.length) {
      $selectedPhoto += 1
      $photoCallbacks[$selectedPhoto]()
    }
  }

  function prevPhoto() {
    if($selectedPhoto - 1 >= 0) {
      $selectedPhoto -= 1
      $photoCallbacks[$selectedPhoto]()
    }
  }

  $enterFullscreen = enterFullscreenFn;
</script>

<div
id="fullscreen-viewer" 
bind:this={fullscreenNode} 
class:focused={false} 
  >
  {#if mobile}
    <!-- svelte-ignore a11y_missing_attribute -->
    <img bind:this={imageNode} style:max-width="100%" >
    <div id="button-container">
      <button onclick={prevPhoto}>&leftarrow;</button>
      <button onclick={nextPhoto}>&rightarrow;</button>
    </div>
  {:else}
    <button onclick={prevPhoto}>&leftarrow;</button>
    <!-- svelte-ignore a11y_missing_attribute -->
    <img bind:this={imageNode} style:max-width="80%" >
    <button onclick={nextPhoto}>&rightarrow;</button>
  {/if}
  <button id="exit" onclick={exitFullscreen}>&cross;</button>
</div>

<style>
  #fullscreen-viewer {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    z-index: -1;
    background: rgba(0,0,0,.75);
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0;
  }

  #fullscreen-viewer.focused {
    z-index: 999;
    opacity: 1;
  }

  img {
    object-fit: contain;
    max-height: 100%;
  }

  button {
    border: 0;
    background-color: transparent;
    color: white;
    font-size: xx-large;
    margin: 0;
    padding: 3vw;
    touch-action: manipulation;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  }

  #exit {
    position: absolute;
    top: 0;
    right: 0;
  }

  #button-container {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
    left: 0;
    z-index: 1000;
  }
</style>