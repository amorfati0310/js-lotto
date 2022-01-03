class View {
  constructor(el) {
    this.el = el;
  }

  on(eventName, handler) {
    this.el.addEventListener(eventName, handler);
    return this;
  }

  emit(eventName, payload) {
    const emittedEvent = new CustomEvent(eventName, { detail: payload });
    this.el.dispatchEvent(emittedEvent);
    return this;
  }
}

export default View;
