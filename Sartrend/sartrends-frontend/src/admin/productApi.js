// src/admin/productApi.js
import { products as initialProducts } from '../data/products';

// LocalStorage key
const LS_KEY = 'sar_products_v1';

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      localStorage.setItem(LS_KEY, JSON.stringify(initialProducts));
      return [...initialProducts];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('productApi load error', e);
    return [...initialProducts];
  }
}

function save(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

export function getAllProducts() {
  return new Promise((res) => {
    const list = load();
    // simulate tiny delay
    setTimeout(() => res(list), 150);
  });
}

export function getProductById(id) {
  return new Promise((res, rej) => {
    const list = load();
    // console.log('getProductById id:', id, 'list:', list);
    const p = list.find((x) => x.id === id);
    setTimeout(() => (p ? res(p) : rej(new Error('Product not found'))), 120);
  });
}

export function addProduct(product) {
  return new Promise((res) => {
    const list = load();
    const lastId = list.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0);
    const newProduct = { ...product, id: lastId + 1 };
    list.unshift(newProduct); // add to start
    save(list);
    setTimeout(() => res(newProduct), 120);
  });
}

export function updateProduct(id, updates) {
  return new Promise((res, rej) => {
    const list = load();
    const idx = list.findIndex((x) => String(x.id) === String(id));
    if (idx === -1) return setTimeout(() => rej(new Error('Not found')), 100);
    const updated = { ...list[idx], ...updates, id: list[idx].id };
    list[idx] = updated;
    save(list);
    setTimeout(() => res(updated), 120);
  });
}

export function deleteProduct(id) {
  return new Promise((res, rej) => {
    let list = load();
    const idx = list.findIndex((x) => String(x.id) === String(id));
    if (idx === -1) return setTimeout(() => rej(new Error('Not found')), 100);
    const removed = list.splice(idx, 1)[0];
    save(list);
    setTimeout(() => res(removed), 120);
  });
}
