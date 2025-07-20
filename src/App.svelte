<script>
  import PhotoBatch from './lib/PhotoBatch.svelte';
  import { metadata, photoCallbacks } from './lib/appStores.svelte';
  import FullscreenViewer from './lib/FullscreenViewer.svelte';
  import { setContext } from 'svelte';
  import TitleCard from './lib/TitleCard.svelte';

  let batches = $state([]);
  let doneLoading = $derived(
    (batches.at(-1)?.endIndex ?? 0) >= ($metadata.length ?? 0),
  );
  let scrollableRef;

  setContext('scrollableRef', () => scrollableRef);

  // fetch photo metadata
  // different in dev vs prod mode

  async function loadMetadata() {
    let metadataUrl = import.meta.env.VITE_BUCKET_URL;

    try {
      const response = await fetch(metadataUrl);
      $metadata = await response.json();
      $photoCallbacks = Array($metadata.length);
    } catch (error) {
      console.error(error.message);
    }
  }

  // divide into batches, send each batch to a PhotoBatch component

  function addPhotoBatch() {
    let batchStart = batches.at(-1)?.batchEnd ?? 0; // inclusive
    let batchEnd = batchStart; // exclusive

    while (
      batchEnd < $metadata.length &&
      $metadata[batchStart].batchGuid == $metadata[batchEnd].batchGuid
    ) {
      batchEnd += 1;
    }

    const id = import.meta.env.DEV
      ? batchStart
      : $metadata[batchStart].batchGuid;

    const batchProps = {
      id,
      batchStart,
      batchEnd,
    };

    batches.push(batchProps);
  }

  // intersection observer, determines when another batch should be added

  function loadOnScroll(node) {
    const intersectDiv = document.getElementById('intersect-div');

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !doneLoading) {
          addPhotoBatch();
        }
      },
      { root: intersectDiv, rootMargin: '0px 0px 1000px 0px' },
    );

    intersectionObserver.observe(node);
  }

  // on first load, need to load enough content to push the sentinel div outside of the root
  // useanimationframe to wait for changes to flush

  function initialLoad() {
    requestAnimationFrame(() => {
      const sentinel = document.getElementById('sentinel');
      addPhotoBatch();
      const rect = sentinel.getBoundingClientRect();
      if (rect.top < window.innerHeight * 2 && !doneLoading) initialLoad();
    });
  }

  loadMetadata().then(initialLoad);
</script>

<main id="intersect-div" bind:this={scrollableRef}>
  <TitleCard />
  {#each batches as batch (batch.id)}
    <PhotoBatch {...batch} />
  {/each}
  <div id="sentinel" use:loadOnScroll></div>
</main>

<FullscreenViewer />

<style>
  #intersect-div {
    --bg1: #feffbc;
    --bg2: #fff786;
    height: 100svh;
    width: 100vw;
    overflow-y: scroll;
    padding-left: 10px;
    padding-right: 10px;
  }

  #sentinel {
    width: 100%;
    height: 20px;
  }

  main {
    opacity: 0;
  }
</style>
