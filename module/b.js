/**
 * Created by taox on 16-1-25.
 */
import {foo} from './a.js';
export function bar() {
  if (Math.random() > 0.5) {
    foo();
  }
}