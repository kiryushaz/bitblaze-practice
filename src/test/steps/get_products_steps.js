import assert from 'assert';
import { Given, When, Then, After, Before } from '@cucumber/cucumber';

Before(async function () {
  this.select = [];
  this.q = new Map();
})

Given('I want to see {string} of the products', async function (string) {
  this.select.push(string);
})

Given('I want to skip the first {int} products', async function (skip) {
  this.q.set("skip", skip);
})

Given('I want to skip the last {int} products', async function (skip) {
  this.q.set("limit", -skip);
})

Given('I want to get {int} products', async function (limit) {
  this.q.set("limit", limit);
})

Given('I want to get all products', async function () {
  this.q.set("limit", 0);
})

When('I make request to get products', async function () {
  const queryParams = [];
  let fetchUrl = 'https://dummyjson.com/products';

  if (this.select.length > 0) {
    this.q.set("select", this.select.join(','));
  }

  for (const [key, value] of this.q) {
    queryParams.push(`${key}=${value}`);
  }

  if (queryParams.length > 0) {
    fetchUrl += '?' + queryParams.join('&');
  }

  const response = await fetch(fetchUrl);
  this.actual = await response.json();
})

Then('I get a response in JSON format', async function (expectedJson) {
  const regex = new RegExp(expectedJson.replaceAll(/[\n\s]/g, ''));

  assert.strictEqual(regex.test(JSON.stringify(this.actual)), true);
})

Then('Product list starts with id {int}', async function (expectedId) {
  const products = this.actual.products;
  const firstProductId = products[0].id;

  assert.strictEqual(firstProductId, expectedId, `Actual ${firstProductId} !== Expected ${expectedId}`)
})

Then('Product list ends with id {int}', async function (expectedId) {
  const products = this.actual.products;
  const lastProductId = products[products.length-1].id;

  assert.strictEqual(lastProductId, expectedId, `Actual ${lastProductId} !== Expected ${expectedId}`)
})

Then('Products length equals {int}', async function (expectedLength) {
  const length = this.actual.limit;

  assert.strictEqual(length, expectedLength, `Actual ${length} !== Expected ${expectedLength}`)
})

Then('Product contains attribute {string}', async function (attr) {
  const productKeys = Object.keys(this.actual.products[0]);

  assert.strictEqual(productKeys.includes(attr), true, `Attribute ${attr} does not exist`);
})

Then('Product not contains attribute {string}', async function (attr) {
  const productKeys = Object.keys(this.actual.products[0]);

  assert.strictEqual(productKeys.includes(attr), false);
})

Then('List of products should be empty', async function () {
  assert.strictEqual(this.actual.products.length, 0);
})

After(async function () {
  delete this.select;
  delete this.q;
})
