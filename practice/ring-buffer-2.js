/**
 * This ring buffer can hold n items, instead of n-1 items like the other implementation
 * to do so, i need to keep track of a separate number of items to be read in the buffer.
 */

class RingBuffer {
  constructor(size) {
     this.buffer = new Array(size);
     this.readNext = 0;
     this.writeNext = 0;
     this.itemsInBuffer = 0;
  }

  isEmpty() {
    // buffer is empty if the buffers equal each other
    return this.itemsInBuffer === 0;
  }

  isFull() {
    // buffer is full (no more writes permitted) if the next writeValue == the read value.
    return this.itemsInBuffer === this.size;
  }

  write(val) {
     // if there is a value in the buffer and read and write are not met up, then write to it.
     if(!this.isFull()) {
       this.buffer[this.writeNext] = val;
       this.writeNext = this.nextPointerValue(this.writeNext);
       this.itemsInBuffer += 1;
     } else {
       console.error('Cant write, buffer is full');
     }
  }

  read() {
     if(!this.isEmpty()) {
       const readVal = this.buffer[this.readNext];
       this.readNext = this.nextPointerValue(this.readNext);
       this.itemsInBuffer -= 1;
       return readVal;
     } else {
       console.error('Buffer is empty');
     }
  }

  nextPointerValue(number) {
     return (number + 1) % this.size;
  }

  get size() {
    return this.buffer.length;
  }

  head() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.buffer[this.readNext];
  }

  tail() {
    if (this.isEmpty()) {
      return -1
    }
    const rearIdx = (this.readNext + this.itemsInBuffer - 1) % this.size;
    return this.buffer[rearIdx];
  }
}

const rb = new RingBuffer(3);

for (let i = 0; i < rb.size; i++) {
  rb.write(i);
}
console.log(rb);
rb.write(4); // should fail, buff is full

console.log(rb.read());
console.log(rb);
rb.write(4); //should succeed now
console.log(rb);
console.log('should be 1:', rb.head()) // should be 1
console.log('should be 4:', rb.tail()) // should be 4

while(!rb.isEmpty()) {
  console.log(rb.read())
}

console.log(rb);