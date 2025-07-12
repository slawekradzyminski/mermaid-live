import { test, expect } from '@playwright/test'

test('diagram persists on first load', async ({ page }) => {
  // given
  await page.goto('/')
  
  // when - wait for the diagram to appear
  await expect(page.locator('svg')).toBeVisible()
  
  // then - wait longer than the previous disappearance window and verify it's still there
  await page.waitForTimeout(1000)
  await expect(page.locator('svg')).toBeVisible()
})

test('diagram persists after code changes', async ({ page }) => {
  // given
  await page.goto('/')
  
  // when - wait for initial diagram
  await expect(page.locator('svg')).toBeVisible()
  
  // when - modify the code
  await page.locator('.cm-editor').click()
  await page.keyboard.press('End')
  await page.keyboard.type('\n    C[New Node]')
  
  // then - diagram should still be visible after update
  await expect(page.locator('svg')).toBeVisible()
  await page.waitForTimeout(500)
  await expect(page.locator('svg')).toBeVisible()
}) 