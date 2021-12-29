class View {
  constructor(el) {
    this.el = el;
  }

  on(eventName, handler) {
    this.el.addEventListener(eventName, handler);
  }

  emit(eventName, payload) {
    const emittedEvent = new CustomEvent(eventName, { detail: payload });
    this.el.dispatchEvent(emittedEvent);
  }
}

export default View;
