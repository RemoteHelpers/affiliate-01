const desktopLogosRef = document.querySelector('#js-swiper');
const desktopViewport = 1200;
let desktopMode = false;

document.addEventListener('DOMContentLoaded', onLoadViewportCheck);
window.addEventListener('resize', _.throttle(onViewportChange, 500), false);

const logos = `<div class="logo-wrapper">
        <div class="logo-wrapper__first-string">
          <div
            class="swiper-slide company-logo-view"
            style="width: 290px; display: flex; align-items: center"
          >
            <img
              src="./img/clients/finance4learning.png"
              alt="Finance4Learning"
            />
          </div>
          <div
            class="company-logo-view"
            style="width: 220px; display: flex; align-items: center"
          >
            <img src="./img/clients/fancyames.png" alt="fancyames" />
          </div>
        </div>
        <div class="logo-wrapper__second-string">
          <div
            class="swiper-slide company-logo-view"
            style="width: 157px; display: flex; align-items: center"
          >
            <img src="./img/clients/chiko.png" alt="chiko" />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 144px; display: flex; align-items: center"
          >
            <img
              src="./img/clients/q-online-d-m-agancy.png"
              alt="Q Online Digital Marketing Agency"
            />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 186px; display: flex; align-items: center"
          >
            <img src="./img/clients/onward-click.png" alt="OnwardClick" />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 204px; display: flex; align-items: center"
          >
            <img
              src="./img/clients/silicon-publishing.png"
              alt="Silicon Publishing"
            />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 220px; display: flex; align-items: center"
          >
            <img src="./img/clients/cygobel.png" alt="cygobel" />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 202px; display: flex; align-items: center"
          >
            <img
              src="./img/clients/change-consult-scotland.png"
              alt="Change Consulting Scotland"
            />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 191px; display: flex; align-items: center"
          >
            <img src="./img/clients/taketask.png" alt="TakeTask" />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 225px; display: flex; align-items: center"
          >
            <img
              src="./img/clients/metropolitan-movers.png"
              alt="Metropolitan Movers"
            />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 220px; display: flex; align-items: center"
          >
            <img src="./img/clients/evolution-u.jpg" alt="Evolution U" />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 220px; display: flex; align-items: center"
          >
            <img src="./img/clients/edgency.jpg" alt="EDGency" />
          </div>
          <div
            class="swiper-slide company-logo-view"
            style="width: 220px; display: flex; align-items: center"
          >
            <img src="./img/clients/collect-media.png" alt="Collect Media" />
          </div>
          <div
            class="company-logo-view"
            style="
              width: 220px;
              display: flex;
              align-items: center;
            "
          >
            <img src="./img/clients/convertise.png" alt="Convertise" />
          </div>
        </div>
      </div>`;

new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  centeredSlides: true,
  initialSlide: 7,
});

function onLoadViewportCheck(e) {
  if (e.target.body.clientWidth >= desktopViewport) {
    desktopMode = true;
    desktopLogosRef.insertAdjacentHTML('beforeend', logos);
    return;
  }
  desktopLogosRef.innerHTML = '';
}

function onViewportChange(e) {
  if (!desktopMode) {
    if (e.target.innerWidth >= desktopViewport) {
      desktopMode = true;
      desktopLogosRef.insertAdjacentHTML('beforeend', logos);
    }
  }
  if (desktopMode) {
    if (e.target.innerWidth < desktopViewport) {
      desktopMode = false;
      desktopLogosRef.innerHTML = '';
    }
  }
}
