// Make a pure function 'bar' to wrap around 'foo'

function foo(x) {
	y++;
	z = x * y;
}

var y = 5, z;

foo(20);
z;		// 120

foo(25);
z;		// 175


// y is stateful
function bar (x, y) {
  var z;

  foo();
  return [y, z];

  function foo() {
    y++;
    z = x + y;
  }

}

bar(20, 5); // [6, 120]

bar(25, 5); // [6, 175]
