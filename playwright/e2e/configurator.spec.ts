import { test, expect } from '../support/fixtures'

test.describe('Configuração do Veículo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/configure')

  })
  test('deve atualizar a imagem e manter o preço base ao trocar a cor do veículo', async ({ page }) => {
    const priceElement = page.getByTestId('total-price')
    const car = page.locator('img[alt^="Velô Sprint"]')

    await expect(priceElement).toBeVisible()
    await expect(priceElement).toHaveText('R$ 40.000,00')

    await page.getByRole('button', { name: 'Midnight Black' }).click()
    await expect(priceElement).toHaveText('R$ 40.000,00')

    await expect(car).toHaveAttribute('src', /midnight-black-aero-wheels/)
  })

  test('deve atualizar o preço e a imagem ao alterar as rodas, e restaurar os valores padrão', async ({ page }) => {
    const priceElement = page.getByTestId('total-price')
    const car = page.locator('img[alt^="Velô Sprint"]')

    await expect(priceElement).toBeVisible()
    await expect(priceElement).toHaveText('R$ 40.000,00')

    await page.getByRole('button', { name: /Sport Wheels/ }).click()
    await expect(priceElement).toHaveText('R$ 42.000,00')

    await expect(car).toHaveAttribute('src', /glacier-blue-sport-wheels/)

    await page.getByRole('button', { name: /Aero Wheels/ }).click()
    await expect(priceElement).toHaveText('R$ 40.000,00')

    await expect(car).toHaveAttribute('src', /glacier-blue-aero-wheels/)
  })

  test('deve atualizar o preço ao adicionar e remover opcionais, e redirecionar para o checkout', async ({ page }) => {
    const priceElement = page.getByTestId('total-price')

    await expect(priceElement).toBeVisible()
    await expect(priceElement).toHaveText('R$ 40.000,00')

    await page.getByText('Precision Park').click()
    await expect(priceElement).toHaveText('R$ 45.500,00')

    await page.getByText('Flux Capacitor').click()
    await expect(priceElement).toHaveText('R$ 50.500,00')

    await page.getByText('Precision Park').click()
    await expect(priceElement).toHaveText('R$ 45.000,00')

    await page.getByText('Flux Capacitor').click()
    await expect(priceElement).toHaveText('R$ 40.000,00')

    await page.getByRole('button', { name: 'Monte o Seu' }).click()
    await expect(page).toHaveURL(/.*\/order/)
  })
})