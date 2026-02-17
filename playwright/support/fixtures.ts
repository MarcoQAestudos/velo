import { test as base, expect } from '@playwright/test'
import { createOrderLookupActions } from './pages/OrderLockupActions'

type AppFixtures = {
  app: {
    orderLookup: ReturnType<typeof createOrderLookupActions>
  }
}

export const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    const orderLookup = createOrderLookupActions(page)
    await use({ orderLookup })
  },
})

export { expect }


