import { test, expect } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

test.describe('API Tests - Users (Replaces Postman)', () => {

  test('TC001: GET - fetch list of users', async ({ request }) => {
    const response = await request.get(`${BASE}/users`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('email');
    expect(body[0]).toHaveProperty('name');

    console.log('✅ Users fetched:', body.length);
    console.log('First user:', body[0].name, body[0].email);
  });

  test('TC002: GET - fetch single user', async ({ request }) => {
    const response = await request.get(`${BASE}/users/2`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(2);
    expect(body.email).toBeTruthy();
    expect(body.name).toBeTruthy();

    console.log('✅ Single user:', body.name);
  });

  test('TC003: GET - user not found returns 404', async ({ request }) => {
    const response = await request.get(`${BASE}/users/9999`);

    expect(response.status()).toBe(404);
    console.log('✅ 404 handled correctly');
  });

  test('TC004: POST - create new user', async ({ request }) => {
    const response = await request.post(`${BASE}/posts`, {
      data: {
        title: 'Uzair Khan',
        body: 'SDET Engineer',
        userId: 1,
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe('Uzair Khan');
    expect(body.id).toBeTruthy();

    console.log('✅ Record created with ID:', body.id);
  });

  test('TC005: PUT - update existing record', async ({ request }) => {
    const response = await request.put(`${BASE}/posts/1`, {
      data: {
        id: 1,
        title: 'Updated Title',
        body: 'Senior SDET',
        userId: 1,
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Title');

    console.log('✅ Record updated:', body.title);
  });

  test('TC006: DELETE - delete a record', async ({ request }) => {
    const response = await request.delete(`${BASE}/posts/1`);

    expect(response.status()).toBe(200);
    console.log('✅ Record deleted successfully');
  });

});