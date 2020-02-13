export default function () {
  function detectIE() {
    if(navigator.userAgent.match(/Trident.*rv:11\./)) {
      $('body').addClass('ie11');
    } else {
      // Grid Fix
      function resizeGridItem(item) {
        let grid = document.getElementsByClassName("grid")[0];
        let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        let rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = "span " + rowSpan;
      }

      function resizeAllGridItems() {
        let allItems = document.getElementsByClassName("post");
        for (let x = 0; x < allItems.length; x++) {
          resizeGridItem(allItems[x]);
        }
      }

      function resizeInstance(instance) {
        let item = instance.elements[0];
        resizeGridItem(item);
      }

      window.onload = resizeAllGridItems();
      window.addEventListener("resize", resizeAllGridItems);

      let allItems = document.getElementsByClassName("item");
      for (let x = 0; x < allItems.length; x++) {
        imagesLoaded(allItems[x], resizeInstance);
      }
    }
  }

  detectIE();
}