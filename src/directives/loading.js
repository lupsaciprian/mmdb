const spinner = `<div id="loader" class="w-100 h-100" style="top: 0; z-index: -1;" >
<div class="progress">
  <div class="progress-bar indeterminate" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</div>`;

export default {
  update(el, binding, vnode) {
    if (binding.value) {
      el.classList.add("bg-grey");
      const loaderEl = el.querySelector("#loader");
      if (!loaderEl) el.insertAdjacentHTML("beforeend", spinner);
    } else {
      const element = el.querySelector("#loader");
      if (element) element.remove();
    }

    vnode.data.loading = binding.value;
  }
};
