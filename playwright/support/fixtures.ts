import { test as base, expect } from '@playwright/test'
import { createOrderLookupActions } from './pages/OrderLookupActions'
import { createConfiguratorActions } from './pages/ConfiguratorActions'
import { createCheckoutActions } from './pages/CheckoutActions'

type AppFixtures = {
  app: {
    orderLookup: ReturnType<typeof createOrderLookupActions>
    configurator: ReturnType<typeof createConfiguratorActions>
    checkout: ReturnType<typeof createCheckoutActions>
  }
}

export const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    const orderLookup = createOrderLookupActions(page)
    const configurator = createConfiguratorActions(page)
    const checkout = createCheckoutActions(page)

    await use({ orderLookup, configurator, checkout })
  },
})

export { expect }


