/**
 * Created by taox on 16-2-1.
 */
var uint8 = new Uint8Array(1);

uint8[0] = 0xff+0x01;
console.log(uint8[0]); // 0

uint8[0] = 0x00-0x01;
console.log(uint8[0]); // 255

var uint8c = new Uint8ClampedArray(1);

uint8c[0] = 256;
console.log(uint8c[0]); // 255

uint8c[0] = -1;
console.log(uint8c[0]); // 0