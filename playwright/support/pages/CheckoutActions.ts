import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {
  return {
    elements: {
      alerts: {
        get name() { return page.getByTestId('alert-name') },
        get lastname() { return page.getByTestId('alert-surname') },
        get email() { return page.getByTestId('alert-email') },
        get phone() { return page.getByTestId('alert-phone') },
        get document() { return page.getByTestId('alert-cpf') },
        get store() { return page.getByTestId('alert-store') },
        get terms() { return page.getByTestId('alert-terms') },
      },
      get terms() { return page.getByTestId('checkout-terms') },
    },

    async expectLoaded() {
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async fillCustomerData(customer: { name: string; lastname: string; email: string; document: string; phone: string }) {
      await page.getByTestId('checkout-name').fill(customer.name)
      await page.getByTestId('checkout-surname').fill(customer.lastname)
      await page.getByTestId('checkout-email').fill(customer.email)
      await page.getByTestId('checkout-phone').fill(customer.phone)
      await page.getByTestId('checkout-cpf').fill(customer.document)
    },

    async selectStore(store: string) {
      await page.getByTestId('checkout-store').click()
      await page.getByRole('option', { name: store }).click()
    },

    async selectPaymentMethod(payment: string) {
      if (payment === 'À Vista') {
        await page.getByTestId('payment-avista').click()
      } else {
        await page.getByTestId('payment-financiamento').click()
      }
    },

    async acceptTerms() {
      await page.getByTestId('checkout-terms').click()
    },

    async submit() {
      await page.getByTestId('checkout-submit').click()
    },

    async fillDownPayment(downPayment: string) {
      await page.getByTestId('input-entry-value').fill(downPayment)
    },

    async expectSummaryTotal(total: string) {
      const totalElement = page.getByTestId('summary-total-price')
      await expect(totalElement).toHaveText(total)
    }
  }
}
