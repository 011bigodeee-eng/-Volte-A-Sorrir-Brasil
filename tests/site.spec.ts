import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`página completa sem overflow e com imagens válidas em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Seu sorriso.*novo começo/,
    );
    for (const id of [
      "clinica",
      "tratamentos",
      "explorar",
      "duvidas",
      "contato",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(70);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow na seção ${id}`,
      ).toBe(true);
    }
    await page.evaluate(() =>
      document.querySelectorAll("img").forEach((i) => (i.loading = "eager")),
    );
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.every(
              (i) =>
                (i as HTMLImageElement).complete &&
                (i as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    expect(errors).toEqual([]);
    await page.locator("footer").scrollIntoViewIfNeeded();
    if (width <= 700) {
      const last = await page
        .getByRole("link", { name: "Voltar ao topo" })
        .boundingBox();
      const bar = await page.locator(".mobile-appointment").boundingBox();
      expect(last!.y + last!.height).toBeLessThan(bar!.y);
    }
  });
}

test("seletor atualiza imagem, texto e mensagem; teclado navega entre abas", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  for (const [i, id] of [
    "implantes",
    "proteses",
    "dentaduras",
    "ortodontia",
  ].entries()) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel").locator("img")).toHaveAttribute(
      "src",
      new RegExp(id),
    );
    const href = await page
      .getByRole("tabpanel")
      .getByRole("link")
      .getAttribute("href");
    expect(href).toContain("https://wa.me/5598984278547?text=");
    expect(new URL(href!).searchParams.get("text")).toMatch(/Olá!/);
  }
  await tabs.nth(3).focus();
  await page.keyboard.press("Home");
  await expect(tabs.nth(0)).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
});

test("FAQ expande e recolhe com teclado", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", {
    name: /O que é um implante dentário/,
  });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: "O que é um implante dentário?" }),
  ).toContainText("osso");
  await page.keyboard.press("Space");
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("menu mobile prende o foco, navega e fecha com Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Abrir menu" });
  await open.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  await open.click();
  await dialog.getByRole("link", { name: /Tratamentos/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#tratamentos$/);
});

test("contatos e metadados usam dados confirmados", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const links = await page
    .locator('a[href^="https://wa.me/"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  expect(links.length).toBeGreaterThan(12);
  for (const link of links) {
    const u = new URL(link!);
    expect(u.pathname).toBe("/5598984278547");
    expect(u.searchParams.get("text")).toBeTruthy();
  }
  await expect(
    page.locator('a[href="mailto:menezesw618@gmail.com"]').first(),
  ).toBeAttached();
  const data = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ||
      "{}",
  );
  expect(data.address.addressLocality).toBe("Buriticupu");
  expect(data.aggregateRating).toBeUndefined();
  await expect(page).toHaveTitle(/Clínica odontológica em Buriticupu/);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/nao-existe")).status()).toBe(404);
});

test("mapa carrega somente após escolha e utiliza endereço informado", async ({
  page,
}) => {
  await page.route("https://maps.google.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<p>Mapa externo isolado no teste</p>",
    }),
  );
  await page.goto("/");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Carregar mapa" }).click();
  const frame = page.locator("iframe");
  await expect(frame).toBeVisible();
  const url = new URL((await frame.getAttribute("src"))!);
  expect(url.searchParams.get("q")).toContain("Rua Davi Alves Silva");
  expect(url.searchParams.get("q")).toContain("Buriticupu");
});

for (const width of [390, 1440])
  test(`acessibilidade WCAG AA em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    if (width === 390) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      const menu = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(menu.violations).toEqual([]);
    }
  });

test("abertura antecede a página, termina e não se repete na sessão", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".intro")).toBeVisible();
  await expect(page.locator(".intro")).not.toBeVisible({ timeout: 4000 });
  await page.reload();
  await expect(page.locator(".intro")).not.toBeVisible();
});

test("capturas de revisão desktop e mobile", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    await page.goto("/");
    await page.evaluate(() => {
      document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
    });
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.every((i) => (i as HTMLImageElement).complete),
          ),
      )
      .toBe(true);
    await page.screenshot({
      path: `/workspace/artifacts/volte-a-sorrir/${width}-hero.png`,
    });
    await page.screenshot({
      path: `/workspace/artifacts/volte-a-sorrir/${width}-pagina.png`,
      fullPage: true,
    });
  }
});
