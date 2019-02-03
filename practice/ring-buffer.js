/**
 * This is implementation for a ring buffer.
 * https://en.wikipedia.org/wiki/Circular_buffer
 *
 * It is a datastructure built to efficiently read in data from some source
 * and overwrite itself after the data has been read.
 *
 * It is implemented by keeping both read and write pointers. write can advance in front of read
 * but read cannot advance in front of write
 *
 * This RB implementation actually only supports holding n-1 items.
 */

 class RingBuffer {
   constructor(size) {
      this.buffer = new Array(size);
      this.readNext = 0;
      this.writeNext = 0;
   }

   isEmpty() {
     // buffer is empty if the buffers equal each other
     return this.readNext === this.writeNext;
   }

   isFull() {
     // buffer is full (no more writes permitted) if the next writeValue == the read value.
     return this.nextPointerValue(this.writeNext) === this.readNext;
   }

   write(val) {
      // if there is a value in the buffer and read and write are not met up, then write to it.
      if(!this.isFull()) {
        this.buffer[this.writeNext] = val;
        this.writeNext = this.nextPointerValue(this.writeNext);
      } else {
        console.error('Cant write, buffer is full');
      }
   }

   read() {
      if(!this.isEmpty()) {
        const readVal = this.buffer[this.readNext];
        this.readNext = this.nextPointerValue(this.readNext);
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

 while(!rb.isEmpty()) {
   console.log(rb.read())
 }

 console.log(rb);