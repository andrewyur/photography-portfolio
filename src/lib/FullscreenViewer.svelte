<script>
  import { selectedPhoto, photoCallbacks, enterFullscreen, metadata } from "./appStores.svelte";

  let fullscreenNode, imageNode

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

<div id="fullscreen-viewer" bind:this={fullscreenNode} class:focused={false}>
  <button class="cycle left" onclick={prevPhoto}>&leftarrow;</button>
  <!-- svelte-ignore a11y_missing_attribute -->
  <img bind:this={imageNode}>
  <button class="right left" onclick={nextPhoto}>&rightarrow;</button>
  <button id="exit" onclick={exitFullscreen}>&cross;</button>
</div>

<style>
  #fullscreen-viewer {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    z-index: -1;
    background: rgba(0,0,0,.5);
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
    max-width: 80%;
    max-height: 100%;
  }

  button {
    border: 0;
    background-color: transparent;
    color: white;
    font-size: xx-large;
  }

  #exit {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>