export default {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        el.removeEventListener('scroll', f);
      }
    };
    console.log(el);
    el.addEventListener('scroll', f);
  },
};
