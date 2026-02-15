import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';

// AAA - Arrange, Act, Assert

test.describe('Consultar Pedido', () => {


    test.beforeEach(async ({ page }) => {
        //Arrange
        await page.goto('http://localhost:5173/');
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByTestId('header-nav')).toContainText('Consultar Pedido');
    });

    test('deve consultar um pedido aprovado', async ({ page }) => {

        //Teste Date
        const order = {
            number: 'VLO-7AKU91',
            status: 'APROVADO',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Marco Aurélio',
                ematl: 'marco@velo.dev'
            },
            Payment: 'À Vista'

        }

        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();

        //Assert
        // await expect(page.getByText(order)).toBeVisible({ timeout: 10_000 });
        // await expect(page.getByText('APROVADO')).toBeVisible();

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.ematl}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.Payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status })
        await expect(statusBadge).toHaveClass(/bg-green-100/)
        await expect(statusBadge).toHaveClass(/text-green.700/)

        const statusIcon = statusBadge.locator('svg')
        await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)


    });


    test('deve consultar um pedido reprovado', async ({ page }) => {

        //Teste Data
        const order = {
            number: 'VLO-42O4R0',
            status: 'REPROVADO',
            color: 'Midnight Black',
            wheels: 'aero Wheels',
            customer: {
                name: 'Stive Jobs',
                ematl: 'jobs@apple.com'
            },
            Payment: 'À Vista'

        }

        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();

        //Assert
        // await expect(page.getByText(order)).toBeVisible({ timeout: 10_000 });
        // await expect(page.getByText('APROVADO')).toBeVisible();

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.ematl}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status })
        await expect(statusBadge).toHaveClass(/bg-red-100/)
        await expect(statusBadge).toHaveClass(/text-red.700/)

        const statusIcon = statusBadge.locator('svg')
        await expect(statusIcon).toHaveClass(/lucide-circle-x/)

    });

    test('deve consultar um pedido em analise', async ({ page }) => {

        //Teste Data
        const order = {
            number: 'VLO-F7Y4US',
            status: 'EM_ANALISE',
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'Josivanja Silva',
                ematl: 'josi300@velo.dev'
            },
            Payment: 'À Vista'

        }

        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();

        //Assert
        // await expect(page.getByText(order)).toBeVisible({ timeout: 10_000 });
        // await expect(page.getByText('APROVADO')).toBeVisible();

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.ematl}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status })
        await expect(statusBadge).toHaveClass(/bg-amber-100/)
        await expect(statusBadge).toHaveClass(/text-amber.700/)

        const statusIcon = statusBadge.locator('svg')
        await expect(statusIcon).toHaveClass(/lucide-clock/)

    });

    test('deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {

        //Teste Data
        const order = generateOrderCode();

        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click(); //Não encontrou o pedido, então o botão não foi clicado

        //Assert
        // abordagem, de validação mais robusta, pois busca pelo texto exato e pelo nível de heading
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);
    });
});




