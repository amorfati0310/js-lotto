class Subscriber {
  #fn;

  constructor(fn) {
    this.#fn = fn;
  }

  subscribe(publisher) {
    publisher.addSubscriber(this.#fn);
  }
}

export default Subscriber;
