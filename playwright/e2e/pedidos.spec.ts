import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('test', async ({ page }) => {

    //Arrange
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByTestId('header-nav')).toContainText('Consultar Pedido');

    //Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-7AKU91');
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

     //Assert
    await expect(page.getByText(/VLO-/)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-7AKU91');


    const orderCard = page.locator('[class*="animate-fade-in"]');
    await expect(orderCard.getByText(/VLO-/)).toBeVisible();
    await expect(orderCard.getByText('APROVADO')).toBeVisible();


   
    //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000});
    //await expect(page.getByTestId('order-result-id')).toContainText('VLO-7AKU91');

    // await expect(page.getByTestId('order-result-status')).toBeVisible();
    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');





});