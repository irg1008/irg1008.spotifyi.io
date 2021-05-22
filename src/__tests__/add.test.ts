import add from "../__test_components__/add";

test("Sumar 1 + 2 es igual a 3", () => {
  expect(add(1, 2)).toBe(3);
});

test("ASignación de objeto", () => {
  const data = { uno: 1 };
  data["dos"] = 2;
  expect(data).toEqual({ uno: 1, dos: 2 });
});

test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3);           // This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

//

test("no hay I en Team", () => {
  expect("team").not.toMatch(/I/);
});

test('hay "stop" en Christopher', () => {
  expect("Christoph").toMatch(/stop/);
});

//

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

//

const compileAndroidCode = () => {
  throw new Error("you are using the wrong JDK");
};

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});

//

const _fetchData = (callback: (data: string) => void) => {
  callback("peanut butter");
};

test("the data is peanut butter", (done) => {
  const callback = (data: string) => {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  };

  _fetchData(callback);
});

const fetchData = async () => {
  return "peanut butter";
};

// Async await.
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});
