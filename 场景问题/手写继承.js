const base = {
  call() {
    console.log(this.value || "no value");
  },
  name: "base"
};

function A() {}

a.prototype = base;

const instanceA = new A();
