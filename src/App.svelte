<script>
  import PhotoBatch from "./lib/PhotoBatch.svelte";

  let metadata = $state(null)
  let batches = $state([])
  let doneLoading = $derived((batches.at(-1)?.endIndex ?? 0) >= (metadata?.length ?? 0))

  // fetch photo metadata
  // different in dev vs prod mode

  async function loadMetadata() {
    // need to do this in dev mode bcs i forgot to add cors headers at first 🙄
    const metadataUrl = import.meta.env.VITE_PHOTO_METADATA_URL + "?nocache=" + Date.now();
    try {
      const response = await fetch(metadataUrl)
      metadata = await response.json()
    } catch (error) {
      console.error(error.message)
    }
  }

  $inspect(batches)
  $inspect(doneLoading)

  // divide into batches, send each batch to a PhotoBatch component

  function addPhotoBatch() {
    let batchStart = batches.at(-1)?.endIndex ?? 0 // inclusive
    let batchEnd = batchStart // exclusive

    while(batchEnd < metadata.length && metadata[batchStart].batchGuid == metadata[batchEnd].batchGuid) {
      batchEnd += 1
    }

    const batchProps = {
      id: metadata[batchStart].batchGuid,
      photoMetadata: metadata.slice(batchStart, batchEnd),
      endIndex: batchEnd,
    }

    batches.push(batchProps)
  }

  // intersection observer, determines when another batch should be added

  function loadOnScroll(node) {
    const intersectDiv = document.getElementById('intersect-div')
    
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting && !doneLoading) {
        addPhotoBatch()
      }
    }, {root: intersectDiv, rootMargin: "0px 0px 500px 0px"})

    intersectionObserver.observe(node)
  } 

  // on first load, need to load enough content to push the sentinel div outside of the root
  // useanimationframe to wait for changes to flush
  
  function initialLoad() {
    requestAnimationFrame(() => {
      const sentinel = document.getElementById('sentinel')
      addPhotoBatch()
      const rect = sentinel.getBoundingClientRect()
      if(rect.top < window.innerHeight * 2 && !doneLoading)
        initialLoad()
    })
  }

  loadMetadata().then(initialLoad)
</script>

<main id="intersect-div">
  {#each batches as batch (batch.id)}
    <PhotoBatch photosMetadata={batch.photoMetadata}/>
  {/each}
  <div id="sentinel" use:loadOnScroll></div>
</main>

<style>

  #intersect-div {
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
  }

  #sentinel {
    width: 100%;
    height: 20px;
  }

</style>
