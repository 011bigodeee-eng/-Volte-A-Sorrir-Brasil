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
      "implantes",
      "experiencia",
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
  for (const [city, address, phone] of [
    ["Araguatins", "Rua Tenente Siqueira Campos, Nº 745 - Centro", "+5563999981757"],
    ["Augustinópolis", "Rua Goiás, Nº 1010 - Centro", "+5563999412311"],
  ]) {
    const unit = page.locator(".location-card").filter({ hasText: city });
    await expect(unit).toContainText(address);
    await expect(unit.locator('a[href^="tel:"]')).toHaveAttribute("href", `tel:${phone}`);
    const map = new URL((await unit.getByRole("link", { name: /Como chegar/ }).getAttribute("href"))!);
    expect(map.searchParams.get("query")).toBe(`${address}, ${city}, Tocantins`);
  }
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
  // Observe the opening before navigation completes: image loading can outlast it.
  await page.addInitScript(() => {
    document.addEventListener("animationstart", (event) => {
      const element = event.target as HTMLElement;
      if (element.classList?.contains("intro")) {
        const style = getComputedStyle(element);
        Object.assign(window, {
          __introSeen:
            style.visibility === "visible" && Number(style.opacity) > 0,
        });
      }
    });
  });
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as { __introSeen?: boolean }).__introSeen,
      ),
    )
    .toBe(true);
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

test("vídeo ilustrativo reproduz, expande em diálogo e pausa ao fechar", async ({
  page,
}) => {
  await page.goto("/");
  const play = page.getByRole("button", {
    name: "Reproduzir vídeo ilustrativo",
  });
  await play.click();
  const dialog = page.getByRole("dialog", {
    name: "Um sorriso, novas possibilidades",
  });
  await expect(dialog).toBeVisible();
  const video = page.locator(".cinema-dialog video");
  await expect
    .poll(
      () =>
        video.evaluate((v) => ({
          time: (v as HTMLVideoElement).currentTime,
          error: (v as HTMLVideoElement).error?.code ?? null,
        })),
      { timeout: 15000 },
    )
    .toMatchObject({ error: null });
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime), {
      timeout: 15000,
    })
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((v) => (v as HTMLVideoElement).videoWidth)).toBe(
    1280,
  );
  expect(
    await video.evaluate((v) => (v as HTMLVideoElement).duration),
  ).toBeCloseTo(14.5, 0);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(play).toBeFocused();
  expect(await video.evaluate((v) => (v as HTMLVideoElement).paused)).toBe(
    true,
  );
});

test("rolagem revela cards e expande o vídeo sem a faixa diagonal", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() =>
    sessionStorage.setItem("vas-intro-v2", "seen"),
  );
  await page.goto("/");
  const card = page.locator(".treatment-card").first();
  await expect(card).toHaveClass(/will-reveal/);
  const stage = page.locator(".cinema-stage");
  const initial = await stage.evaluate((el) =>
    Number((el as HTMLElement).style.getPropertyValue("--cinema-scale")),
  );
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveClass(/is-visible/);
  await expect(page.locator(".diagonal-band")).toHaveCount(0);
  await page.evaluate(() => {
    const el = document.querySelector(".cinema-stage")!;
    window.scrollTo({
      top: scrollY + el.getBoundingClientRect().top - innerHeight * 0.2,
      behavior: "instant",
    });
  });
  await expect
    .poll(() =>
      stage.evaluate((el) =>
        Number((el as HTMLElement).style.getPropertyValue("--cinema-scale")),
      ),
    )
    .toBeGreaterThan(initial);
  await expect(stage).toHaveCSS("overflow", "visible");
});

test("mouse inclina o card e revela lupa; movimento reduzido desativa os efeitos", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() =>
    sessionStorage.setItem("vas-intro-v2", "seen"),
  );
  await page.goto("/");
  const card = page.locator(".treatment-card").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveClass(/is-visible/);
  const image = card.locator(".treatment-image");
  const box = (await image.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.6);
  await expect
    .poll(() =>
      card.evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("--tilt-y"),
      ),
    )
    .not.toBe("");
  await expect(card.locator(".detail-lens")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      card.evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("--tilt-y"),
      ),
    )
    .toBe("");
  await expect(card.locator(".detail-lens")).toHaveCSS("display", "none");
  await expect(page.locator(".liquid-scene>span").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".cinema-frame")).toHaveCSS("transform", "none");
});


test("seção de implantes explica etapas, abre dúvidas pelo teclado e direciona o agendamento", async ({ page }) => {
  await page.goto("/#implantes");
  const section = page.locator("section#implantes");
  await expect(section.getByRole("heading", { level: 2 })).toContainText("implante dentário");
  await expect(section.getByRole("listitem")).toHaveCount(4);
  const question = section.locator("summary").filter({ hasText: "Quanto tempo leva o tratamento?" });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(section.getByText(/Somente a avaliação permite estimar o tempo/)).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(section.getByText(/Somente a avaliação permite estimar o tempo/)).not.toBeVisible();
  const link = section.getByRole("link", { name: "Agendar avaliação para implantes" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/5598984278547");
  expect(url.searchParams.get("text")).toBe("Olá! Gostaria de agendar uma avaliação para implantes dentários.");
});
