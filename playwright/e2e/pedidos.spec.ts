import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  //check point 1: verificar se o titulo da pagina é "Velô Sprint"
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //check point 2: verificar se a pagina de consulta de pedidos é carregada
  await expect(page.getByTestId('header-nav')).toContainText('Consultar Pedido');

  //numero do pedido valido  
  await page.getByTestId('search-order-id').fill('VLO-7AKU91');

  await page.getByTestId('search-order-button').click();

  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-7AKU91');

  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
       


});