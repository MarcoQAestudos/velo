import { Page } from '@playwright/test'

export function createHomeActions(page: Page) {
  return {
    async go() {
      await page.goto('/')
    },

    async startConfiguration() {
      await page.getByRole('link', { name: /Configure Agora/i }).click()
    }
  }
}
