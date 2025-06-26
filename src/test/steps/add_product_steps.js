import assert from 'assert';
import { Given, When, Then, After, Before } from '@cucumber/cucumber';

Before(async function () {
  this.attrs = new Map();
})

Given('Attribute {string} with value {float}', async function (key, value) {
  this.attrs.set(key, value);
})

Given('Attribute {string} with value {string}', async function (key, value) {
  this.attrs.set(key, value);
})

When('I make POST request to add product', async function () {
  const productData = Object.fromEntries(this.attrs);
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  this.actual = await response.json();
})

Then('I get a response in JSON like this', async function (expected) {
  assert.deepStrictEqual(this.actual, JSON.parse(expected), "JSON does not match");
});

After(async function () {
  delete this.attrs;
})
