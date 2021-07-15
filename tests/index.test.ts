import { main } from "@src/lib";

test("main", () => {
  expect(typeof main(new Date())).toBe("number");
});
